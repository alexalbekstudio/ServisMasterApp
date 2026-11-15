import io
import os
import re
import base64
from pathlib import Path
from decimal import Decimal

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from app.models.shop import Shop
from app.models.work_order import WorkOrder
from app.models.vehicle import Vehicle
from app.models.customer import Customer
from app.services.ips_qr_service import IpsQrService
from app.api.v1.endpoints.settings import read_settings, LOGO_PATH


EN_TEXT_TRANSLATIONS = {
    "Mali servis (zamena ulja i svih filtera)": "Minor Service (Oil & All Filters Replacement)",
    "Zamena desne spone i centriranje trapa": "Right Tie Rod Replacement & Wheel Alignment",
    "Motorno ulje Elf Evolution 5W-30 (5L)": "Engine Oil Elf Evolution 5W-30 (5L)",
    "Filter ulja Mann W75/3": "Oil Filter Mann W75/3",
    "Filter ulja Mann": "Oil Filter Mann",
    "Desna spona Lemförder": "Right Tie Rod End Lemförder",
    "Veliki servis (set zupčenja + vodena pumpa - rad)": "Major Service (Timing Belt Kit & Water Pump - Labor)",
    "Set zupčastog kaiša sa vodenom pumpom Continental": "Timing Belt & Water Pump Kit Continental",
    "Prednje kočione pločice ATE": "Front Brake Pads ATE",
    "Zamena kočionih pločica": "Brake Pads Replacement (Labor)",
    "Kompjuterska OBD-II dijagnostika i očitavanje parametara": "Computer OBD-II Diagnostics & Live Parameter Scan",
    "Ultrazvučno čišćenje EGR ventila": "Ultrasonic EGR Valve Cleaning",
    "Skidanje menjača i zamena seta kvačila sa zamajcem": "Gearbox Removal & Clutch/Dual-Mass Flywheel Replacement",
    "Plivajući zamajac + set kvačila LuK": "Dual-Mass Flywheel & Clutch Kit LuK",
    "Servis i dopuna auto-klime (R134a)": "A/C Service & Refrigerant Recharge (R134a)",
    "Filter kabine sa aktivnim ugljem Mahle": "Activated Carbon Cabin Filter Mahle",
    "Pun": "Full",
}

EN_PHRASE_REPLACEMENTS = [
    ("Detektovano preskakanje paljenja.", "Misfire detected."),
    ("Lupa u prednjem trapu pri prelasku preko ležećih policajaca.", "Front suspension knocking noise over speed bumps."),
    ("Odraditi i redovan mali servis.", "Perform regular oil & filter service."),
    ("Redovan veliki servis + zamena prednjih i zadnjih kočionih pločica.", "Regular major service + front and rear brake pads replacement."),
    ("Redovan veliki servis + zamena kočionih pločica.", "Regular major service + brake pads replacement."),
    ("Pali se Check Engine lampica na autoputu, slabije vuče uzbrdo.", "Check Engine light comes on at highway speeds, loss of power uphill."),
    ("Proveriti EGR i DPF.", "Inspect EGR valve and DPF filter."),
    ("Vibracije pri polasku i gašenju motora.", "Vibrations when starting off and shutting down the engine."),
    ("Sumnja na plivajući zamajac i set kvačila.", "Suspected dual-mass flywheel and clutch kit wear."),
    ("Dopuna klime, dezinfekcija kabine ozonom i zamena polen filtera sa aktivnim ugljem.", "A/C recharge, ozone cabin disinfection and activated carbon cabin filter replacement."),
]


def translate_to_en(text: str) -> str:
    if not text:
        return "-"
    t = text.strip()
    if t in EN_TEXT_TRANSLATIONS:
        return EN_TEXT_TRANSLATIONS[t]
    for sr_p, en_p in EN_PHRASE_REPLACEMENTS:
        t = t.replace(sr_p, en_p)
    return t


def resolve_logo_path(custom_path: str = None) -> str:
    try:
        if LOGO_PATH.exists() and LOGO_PATH.is_file() and LOGO_PATH.stat().st_size > 200:
            return str(LOGO_PATH)
        if custom_path and os.path.exists(custom_path) and os.path.getsize(custom_path) > 200:
            return custom_path
    except Exception:
        pass
    return None


def safe_rl_image(path_or_bio, width_mm: float, height_mm: float):
    try:
        return Image(path_or_bio, width=width_mm * mm, height=height_mm * mm, kind="proportional")
    except Exception:
        return None


def setup_pdf_fonts():
    font_paths = [
        ("C:\\Windows\\Fonts\\arial.ttf", "C:\\Windows\\Fonts\\arialbd.ttf"),
        ("C:\\Windows\\Fonts\\segoeui.ttf", "C:\\Windows\\Fonts\\segoeuib.ttf"),
        ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
        ("/usr/share/fonts/TTF/DejaVuSans.ttf", "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf"),
    ]
    regular_registered = False
    bold_registered = False

    for reg_path, bold_path in font_paths:
        if os.path.exists(reg_path) and not regular_registered:
            try:
                pdfmetrics.registerFont(TTFont("CustomFont", reg_path))
                regular_registered = True
            except Exception:
                pass
        if os.path.exists(bold_path) and not bold_registered:
            try:
                pdfmetrics.registerFont(TTFont("CustomFont-Bold", bold_path))
                bold_registered = True
            except Exception:
                pass
        if regular_registered and bold_registered:
            break

    if regular_registered and not bold_registered:
        pdfmetrics.registerFont(TTFont("CustomFont-Bold", reg_path))

    return "CustomFont" if regular_registered else "Helvetica"


class PdfService:
    FONT_NAME = None
    FONT_BOLD = None

    @classmethod
    def _init_fonts(cls):
        if cls.FONT_NAME is None:
            base_font = setup_pdf_fonts()
            cls.FONT_NAME = base_font
            cls.FONT_BOLD = f"{base_font}-Bold" if base_font != "Helvetica" else "Helvetica-Bold"

    @classmethod
    def _get_shop_branding(cls, shop: Shop) -> dict:
        cfg = read_settings()
        return {
            "name": cfg.get("company_name") or (shop.name if shop else "ServisMaster OS"),
            "address": cfg.get("company_address") or (shop.address if shop else ""),
            "city": cfg.get("company_city") or (shop.city if shop else ""),
            "phone": cfg.get("company_phone") or (shop.phone if shop else "-"),
            "pib": cfg.get("company_pib") or (shop.pib if shop else "-"),
            "mb": cfg.get("company_mb") or (getattr(shop, "maticni_broj", None) if shop else "-") or "-",
            "currency": cfg.get("currency_base") or "RSD",
        }

    @classmethod
    def generate_work_order_pdf(
        cls, shop: Shop, work_order: WorkOrder, vehicle: Vehicle, customer: Customer
    ) -> bytes:
        cls._init_fonts()
        b = cls._get_shop_branding(shop)
        cur = b["currency"]

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, pagesize=A4,
            leftMargin=15 * mm, rightMargin=15 * mm, topMargin=15 * mm, bottomMargin=15 * mm,
        )

        elements = []
        styles = getSampleStyleSheet()

        meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName=cls.FONT_NAME, fontSize=9, leading=13, textColor=colors.HexColor("#334155"))
        bold_meta = ParagraphStyle('BoldMeta', parent=meta_style, fontName=cls.FONT_BOLD)
        right_meta = ParagraphStyle('RightMeta', parent=meta_style, alignment=TA_RIGHT)
        center_meta = ParagraphStyle('CenterMeta', parent=meta_style, alignment=TA_CENTER)

        found_logo_path = resolve_logo_path(getattr(shop, 'logo_path', None))
        logo_img = safe_rl_image(found_logo_path, 20, 20) if found_logo_path else None
        addr_line = ", ".join(filter(None, [b["address"], b["city"]])) or "-"

        shop_info = f"""<b>{b["name"]}</b><br/>
{addr_line}<br/>
Tel: {b["phone"]} | PIB: {b["pib"]}<br/>
MB: {b["mb"]}
"""
        order_meta = f"""<b>RADNI NALOG br: #{work_order.order_number}</b><br/>
Datum prijema: {work_order.received_at.strftime('%d.%m.%Y %H:%M')}<br/>
Status: <b>{getattr(work_order.status, 'value', work_order.status)}</b><br/>
Kilometraža: {work_order.mileage_at_reception:,} km
"""

        if logo_img:
            header_table = Table([[logo_img, Paragraph(shop_info, meta_style), Paragraph(order_meta, right_meta)]], colWidths=[24 * mm, 86 * mm, 70 * mm])
            header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ALIGN', (0, 0), (0, 0), 'LEFT'), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
        else:
            header_table = Table([[Paragraph(shop_info, meta_style), Paragraph(order_meta, right_meta)]], colWidths=[105 * mm, 75 * mm])
            header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))

        elements.append(header_table)
        elements.append(Spacer(1, 4 * mm))

        company_info = f"<br/>{customer.company_name} (PIB: {customer.pib})" if getattr(customer, 'is_company', False) and customer.company_name else ""
        client_data = f"""<b>PODACI O VLASNIKU:</b><br/>{customer.full_name}<br/>Tel: {customer.phone or '-'}{company_info}"""
        vehicle_data = f"""<b>PODACI O VOZILU:</b><br/>Vozilo: <b>{vehicle.make} {vehicle.model}</b><br/>Tablice: <b>{vehicle.license_plate}</b><br/>Šasija (VIN): {vehicle.vin or 'N/A'}<br/>Nivo goriva: {work_order.fuel_level or '-'}"""
        info_table = Table([[Paragraph(client_data, meta_style), Paragraph(vehicle_data, meta_style)]], colWidths=[90 * mm, 90 * mm])
        info_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f8fafc")), ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")), ('PADDING', (0, 0), (-1, -1), 6)]))
        elements.append(info_table)
        elements.append(Spacer(1, 4 * mm))

        complaint_text = f"<b>Opis problema / Zahtev klijenta:</b><br/>{work_order.complaint_description or '-'}"
        complaint_table = Table([[Paragraph(complaint_text, meta_style)]], colWidths=[180 * mm])
        complaint_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f1f5f9")), ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('PADDING', (0, 0), (-1, -1), 6)]))
        elements.append(complaint_table)
        elements.append(Spacer(1, 5 * mm))

        table_rows = [[
            Paragraph("<b>#</b>", bold_meta), Paragraph("<b>Opis rada / Naziv dela</b>", bold_meta),
            Paragraph("<b>Tip</b>", bold_meta), Paragraph("<b>Kol.</b>", bold_meta),
            Paragraph(f"<b>Cena ({cur})</b>", bold_meta), Paragraph(f"<b>Iznos ({cur})</b>", bold_meta),
        ]]

        total_labor = Decimal("0.00")
        total_parts = Decimal("0.00")

        for idx, item in enumerate(work_order.items, start=1):
            qty = Decimal(str(item.quantity))
            price = Decimal(str(item.unit_price))
            total = qty * price
            if item.is_part:
                total_parts += total
                type_label = "Deo"
            else:
                total_labor += total
                type_label = "Usluga"

            table_rows.append([
                Paragraph(str(idx), meta_style), Paragraph(item.title, meta_style),
                Paragraph(type_label, meta_style), Paragraph(f"{qty:.2f}", meta_style),
                Paragraph(f"{price:,.2f}", meta_style), Paragraph(f"{total:,.2f}", bold_meta),
            ])

        if len(table_rows) == 1:
            table_rows.append([Paragraph("-", meta_style), Paragraph("Nema unetih stavki", meta_style), Paragraph("-", meta_style), Paragraph("-", meta_style), Paragraph("-", meta_style), Paragraph("0.00", meta_style)])

        items_table = Table(table_rows, colWidths=[8 * mm, 74 * mm, 20 * mm, 22 * mm, 26 * mm, 30 * mm])
        items_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#e2e8f0")), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('PADDING', (0, 0), (-1, -1), 4), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
        elements.append(items_table)
        elements.append(Spacer(1, 4 * mm))

        grand_total = total_labor + total_parts
        summary_text = f"""<b>Usluge / Rad:</b> {total_labor:,.2f} {cur}<br/>
<b>Rezervni delovi:</b> {total_parts:,.2f} {cur}<br/>
-------------------------------------------------<br/>
<font size="12"><b>UKUPNO ZA NAPLATU: {grand_total:,.2f} {cur}</b></font>
"""
        summary_p = Paragraph(summary_text, meta_style)

        qr_flowable = Paragraph("", meta_style)
        if grand_total > 0 and vehicle:
            try:
                raw_qr_base64 = IpsQrService.get_order_payment_qr(shop, work_order, vehicle)
                if raw_qr_base64:
                    _, b64_data = raw_qr_base64.split(",", 1)
                    qr_img_bytes = base64.b64decode(b64_data)
                    qr_img = safe_rl_image(io.BytesIO(qr_img_bytes), 34, 34)
                    if qr_img:
                        qr_flowable = qr_img
            except Exception:
                pass

        summary_table = Table([[qr_flowable, summary_p]], colWidths=[40 * mm, 140 * mm])
        summary_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (1, 0), (1, 0), 'RIGHT')]))
        elements.append(summary_table)
        elements.append(Spacer(1, 10 * mm))

        signature_table = Table([[
            Paragraph("________________________________<br/>Vozilo primio (Servis)", center_meta),
            Paragraph("________________________________<br/>Vozilo predao (Vlasnik)", center_meta),
        ]], colWidths=[90 * mm, 90 * mm])
        signature_table.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
        elements.append(signature_table)

        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()

    @classmethod
    def generate_work_order_pdf_en(
        cls, shop: Shop, work_order: WorkOrder, vehicle: Vehicle, customer: Customer
    ) -> bytes:
        cls._init_fonts()
        b = cls._get_shop_branding(shop)
        cur = b["currency"]

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, pagesize=A4,
            leftMargin=15 * mm, rightMargin=15 * mm, topMargin=15 * mm, bottomMargin=15 * mm,
        )

        elements = []
        styles = getSampleStyleSheet()

        meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName=cls.FONT_NAME, fontSize=9, leading=13, textColor=colors.HexColor("#334155"))
        bold_meta = ParagraphStyle('BoldMeta', parent=meta_style, fontName=cls.FONT_BOLD)
        right_meta = ParagraphStyle('RightMeta', parent=meta_style, alignment=TA_RIGHT)
        center_meta = ParagraphStyle('CenterMeta', parent=meta_style, alignment=TA_CENTER)

        found_logo_path = resolve_logo_path(getattr(shop, 'logo_path', None))
        logo_img = safe_rl_image(found_logo_path, 20, 20) if found_logo_path else None
        addr_line = ", ".join(filter(None, [b["address"], b["city"]])) or "-"

        shop_info = f"""<b>{b["name"]}</b><br/>
{addr_line}<br/>
Phone: {b["phone"]} | Tax ID: {b["pib"]}<br/>
Reg. No: {b["mb"]}
"""
        order_meta = f"""<b>WORK ORDER #: {work_order.order_number}</b><br/>
Received: {work_order.received_at.strftime('%d.%m.%Y %H:%M')}<br/>
Status: <b>{getattr(work_order.status, 'value', work_order.status)}</b><br/>
Mileage: {work_order.mileage_at_reception:,} km
"""

        if logo_img:
            header_table = Table([[logo_img, Paragraph(shop_info, meta_style), Paragraph(order_meta, right_meta)]], colWidths=[24 * mm, 86 * mm, 70 * mm])
            header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ALIGN', (0, 0), (0, 0), 'LEFT'), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
        else:
            header_table = Table([[Paragraph(shop_info, meta_style), Paragraph(order_meta, right_meta)]], colWidths=[105 * mm, 75 * mm])
            header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))

        elements.append(header_table)
        elements.append(Spacer(1, 4 * mm))

        company_info = f"<br/>{customer.company_name} (Tax ID: {customer.pib})" if getattr(customer, 'is_company', False) and customer.company_name else ""
        client_data = f"""<b>CUSTOMER:</b><br/>{customer.full_name}<br/>Phone: {customer.phone or '-'}{company_info}"""
        fuel_en = translate_to_en(work_order.fuel_level or '-')
        vehicle_data = f"""<b>VEHICLE:</b><br/>Make/Model: <b>{vehicle.make} {vehicle.model}</b><br/>Plate: <b>{vehicle.license_plate}</b><br/>VIN: {vehicle.vin or 'N/A'}<br/>Fuel level: {fuel_en}"""
        info_table = Table([[Paragraph(client_data, meta_style), Paragraph(vehicle_data, meta_style)]], colWidths=[90 * mm, 90 * mm])
        info_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f8fafc")), ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")), ('PADDING', (0, 0), (-1, -1), 6)]))
        elements.append(info_table)
        elements.append(Spacer(1, 4 * mm))

        complaint_en = translate_to_en(work_order.complaint_description or '-')
        complaint_text = f"<b>Reported issue / Customer request:</b><br/>{complaint_en}"
        complaint_table = Table([[Paragraph(complaint_text, meta_style)]], colWidths=[180 * mm])
        complaint_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f1f5f9")), ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('PADDING', (0, 0), (-1, -1), 6)]))
        elements.append(complaint_table)
        elements.append(Spacer(1, 5 * mm))

        table_rows = [[
            Paragraph("<b>#</b>", bold_meta), Paragraph("<b>Description / Part name</b>", bold_meta),
            Paragraph("<b>Type</b>", bold_meta), Paragraph("<b>Qty</b>", bold_meta),
            Paragraph(f"<b>Price ({cur})</b>", bold_meta), Paragraph(f"<b>Total ({cur})</b>", bold_meta),
        ]]

        total_labor = Decimal("0.00")
        total_parts = Decimal("0.00")

        for idx, item in enumerate(work_order.items, start=1):
            qty = Decimal(str(item.quantity))
            price = Decimal(str(item.unit_price))
            total = qty * price
            if item.is_part:
                total_parts += total
                type_label = "Part"
            else:
                total_labor += total
                type_label = "Service"

            title_en = translate_to_en(item.title)
            table_rows.append([
                Paragraph(str(idx), meta_style), Paragraph(title_en, meta_style),
                Paragraph(type_label, meta_style), Paragraph(f"{qty:.2f}", meta_style),
                Paragraph(f"{price:,.2f}", meta_style), Paragraph(f"{total:,.2f}", bold_meta),
            ])

        if len(table_rows) == 1:
            table_rows.append([Paragraph("-", meta_style), Paragraph("No items yet", meta_style), Paragraph("-", meta_style), Paragraph("-", meta_style), Paragraph("-", meta_style), Paragraph("0.00", meta_style)])

        items_table = Table(table_rows, colWidths=[8 * mm, 74 * mm, 20 * mm, 22 * mm, 26 * mm, 30 * mm])
        items_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#e2e8f0")), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")), ('PADDING', (0, 0), (-1, -1), 4), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
        elements.append(items_table)
        elements.append(Spacer(1, 4 * mm))

        grand_total = total_labor + total_parts
        summary_text = f"""<b>Labor / Services:</b> {total_labor:,.2f} {cur}<br/>
<b>Parts:</b> {total_parts:,.2f} {cur}<br/>
-------------------------------------------------<br/>
<font size="12"><b>TOTAL: {grand_total:,.2f} {cur}</b></font>
"""
        summary_p = Paragraph(summary_text, meta_style)

        qr_flowable = Paragraph("", meta_style)
        if grand_total > 0 and vehicle:
            try:
                raw_qr_base64 = IpsQrService.get_order_payment_qr(shop, work_order, vehicle)
                if raw_qr_base64:
                    _, b64_data = raw_qr_base64.split(",", 1)
                    qr_img_bytes = base64.b64decode(b64_data)
                    qr_img = safe_rl_image(io.BytesIO(qr_img_bytes), 34, 34)
                    if qr_img:
                        qr_flowable = qr_img
            except Exception:
                pass

        summary_table = Table([[qr_flowable, summary_p]], colWidths=[40 * mm, 140 * mm])
        summary_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (1, 0), (1, 0), 'RIGHT')]))
        elements.append(summary_table)
        elements.append(Spacer(1, 10 * mm))

        signature_table = Table([[
            Paragraph("________________________________<br/>Vehicle received (Shop)", center_meta),
            Paragraph("________________________________<br/>Vehicle handed over (Owner)", center_meta),
        ]], colWidths=[90 * mm, 90 * mm])
        signature_table.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
        elements.append(signature_table)

        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()

    @classmethod
    def generate_help_pdf(cls, markdown_content: str) -> bytes:
        cls._init_fonts()

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, pagesize=A4,
            leftMargin=15 * mm, rightMargin=15 * mm, topMargin=14 * mm, bottomMargin=14 * mm,
        )

        elements = []
        styles = getSampleStyleSheet()

        title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'], fontName=cls.FONT_BOLD, fontSize=14, leading=17, alignment=TA_LEFT, textColor=colors.HexColor("#0f172a"), spaceBefore=0, spaceAfter=6)
        h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontName=cls.FONT_BOLD, fontSize=11, leading=14, alignment=TA_LEFT, textColor=colors.HexColor("#b45309"), spaceBefore=7, spaceAfter=2.5)
        h3_style = ParagraphStyle('H3Style', parent=styles['Heading3'], fontName=cls.FONT_BOLD, fontSize=9.5, leading=12, alignment=TA_LEFT, textColor=colors.HexColor("#1e293b"), spaceBefore=4, spaceAfter=1.5)
        body_style = ParagraphStyle('BodyStyle', parent=styles['Normal'], fontName=cls.FONT_NAME, fontSize=8.8, leading=11.5, alignment=TA_LEFT, textColor=colors.HexColor("#334155"), spaceBefore=0, spaceAfter=2)
        list_style = ParagraphStyle('ListStyle', parent=body_style, leftIndent=10, firstLineIndent=0, spaceBefore=0, spaceAfter=1.5)
        code_style = ParagraphStyle('CodeStyle', parent=body_style, fontName=cls.FONT_NAME, fontSize=8, leading=10, textColor=colors.HexColor("#0f172a"), backColor=colors.HexColor("#f1f5f9"), leftIndent=6, rightIndent=6, spaceBefore=2, spaceAfter=3)

        lines = (markdown_content or "").split("\n")
        in_code_block = False
        code_lines = []

        for raw_line in lines:
            line = raw_line.rstrip()

            if line.strip().startswith("```"):
                if not in_code_block:
                    in_code_block = True
                    code_lines = []
                else:
                    in_code_block = False
                    if code_lines:
                        elements.append(Paragraph("<br/>".join(code_lines), code_style))
                continue

            if in_code_block:
                code_lines.append(line.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
                continue

            stripped = line.strip()
            if not stripped or stripped == "---":
                continue
            elif stripped.startswith("# "):
                elements.append(Paragraph(clean_md(stripped[2:]), title_style))
            elif stripped.startswith("## "):
                elements.append(Paragraph(clean_md(stripped[3:]), h2_style))
            elif stripped.startswith("### "):
                elements.append(Paragraph(clean_md(stripped[4:]), h3_style))
            elif stripped.startswith(("- ", "* ")):
                elements.append(Paragraph("• " + clean_md(stripped[2:]), list_style))
            elif re.match(r"^\d+\.\s", stripped):
                elements.append(Paragraph(clean_md(stripped), list_style))
            elif stripped.startswith("|") and stripped.endswith("|"):
                if "---" in stripped:
                    continue
                cells = [clean_md(c.strip()) for c in stripped.strip("|").split("|")]
                elements.append(Paragraph(" | ".join(cells), list_style))
            else:
                elements.append(Paragraph(clean_md(stripped), body_style))

        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()


def clean_md(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
    text = re.sub(r"`(.+?)`", r"<b>\1</b>", text)
    return text