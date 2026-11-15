/**
 * Kontekstualni Info Box (❓ Pomoć) — Moderan UI sa bedževima i dvojezičnom podrškom (SR + EN)
 */

const HELP_DATA = {
    sr: {
        "/": {
            title: "Prijem vozila — Brzi vodič",
            steps: [
                ["Pronađite ili unesite klijenta", "Ukucajte ime ili telefon u pretragu postojećih klijenata ili unesite podatke novog vlasnika vozila."],
                ["Pametni unos vozila (OCR / VIN)", "Skenirajte saobraćajnu dozvolu kamerom uživo, učitajte sliku ili unesite 17-cifreni VIN broj za automatsko prepoznavanje."],
                ["Interaktivni zapisnik oštećenja", "Izaberite tip oštećenja i kliknite na dijagram karoserije kako biste evidentirali postojeća oštećenja pre prijema."],
                ["OBD-II dijagnostika i opis kvara", "Unesite kilometražu, nivo goriva i opis kvara (ili kliknite na 🔌 OBD-II u zaglavlju da direktno upišete DTC kodove grešaka)."],
                ["Kreiranje radnog naloga", "Klikom na 'Kreiraj Radni Nalog' vozilo ulazi u rad i generiše se link sa QR kodom za praćenje statusa."]
            ]
        },
        "/orders": {
            title: "Nalozi u radu — Brzi vodič",
            steps: [
                ["Filtriranje po statusu", "Brzo filtrirajte naloge (Svi, Prijem, U radu, Završeno) pomoću dugmadi na vrhu stranice."],
                ["Dodavanje delova i usluga (+ Stavka)", "Kliknite na '+ Stavka' za unos ugrađenih delova (uz barkod skener) ili sati rada servisa."],
                ["Odobrenje dodatnih radova", "Označite 'Dodatni rad — traži odobrenje' kako bi klijent na svom telefonu jednim klikom odobrio trošak."],
                ["PDF Radni nalog (SR / EN) sa NBS IPS QR", "Kliknite na 📄 SR ili 📄 EN za štampu radnog naloga i računa sa vašim logotipom i QR kodom za instant plaćanje."],
                ["WhatsApp obaveštenje klijentu", "Klikom na 📱 WA šaljete klijentu direktan link za praćenje napretka popravke u realnom vremenu."]
            ]
        },
        "/dashboard": {
            title: "Kontrolna tabla — Analitika servisa",
            steps: [
                ["Finansijski KPI pokazatelji", "Pratite mesečni prihod, prosečnu vrednost naloga (AOV), aktivna vozila i ukupan promet."],
                ["Struktura prihoda (Rad vs Delovi)", "Vizuelni odnos zarade od usluga rada i prodatih rezervnih delova."],
                ["Učinak majstora i statistika", "Pregled prihoda i broja završenih naloga po svakom serviseru u izabranom periodu."]
            ]
        },
        "/inventory": {
            title: "Magacin delova — Brzi vodič",
            steps: [
                ["Brzi unos i barkod skener", "Skenirajte barkod kamerom (📷 Skeniraj kod) ili ručno unesite šifru artikla (SKU), naziv i cenu."],
                ["Kritični minimum zaliha", "Artikli čija količina padne ispod kritičnog minimuma automatski dobijaju crveni alarm."],
                ["Automatsko skidanje sa stanja", "Dodavanjem dela na radni nalog količina u magacinu se automatski umanjuje."]
            ]
        },
        "/reminders": {
            title: "SMS & Email Podsetnici",
            steps: [
                ["Automatski podsetnici za servis", "Pregled svih klijenata kojima danas dospeva termin za mali/veliki servis ili registraciju."],
                ["Slanje jednim klikom", "Klikom na glavno dugme sistem šalje podsetnike svim dospelim klijentima i beleži status u dnevnik."]
            ]
        },
        "/settings": {
            title: "Podešavanja, Brendiranje & Licenca",
            steps: [
                ["White-Label brendiranje", "Unesite naziv vašeg servisa, PIB, adresu, tekući račun i otpremite svoj logo koji se odmah prikazuje u aplikaciji i na PDF nalozima."],
                ["OBD-II & Bluetooth povezivanje", "Izaberite režim dijagnostike (Simulacija, Web Bluetooth ili USB/Serial COM port) za očitavanje grešaka motora."],
                ["WhatsApp, Telegram i Fiskalizacija", "Podesite automatske poruke klijentima i režim fiskalizacije (Interni račun sa QR kodom ili LPFR/VPFR)."]
            ]
        }
    },
    en: {
        "/": {
            title: "Vehicle Reception — Quick Guide",
            steps: [
                ["Find or Create Customer", "Search existing customers by name/phone or enter details for a new vehicle owner."],
                ["Smart Vehicle Input (OCR / VIN)", "Scan the registration card using the live camera, upload an image, or enter a 17-character VIN."],
                ["Interactive Body Damage Report", "Select the damage type and click directly on the vehicle diagram to log pre-existing scratches or dents."],
                ["OBD-II Diagnostics & Fault Description", "Enter mileage, fuel level and fault description (or click 🔌 OBD-II in the header to insert ECU fault codes)."],
                ["Create Work Order", "Click 'Create Work Order' to start tracking repairs and generate a live status link for the customer."]
            ]
        },
        "/orders": {
            title: "Work Orders — Quick Guide",
            steps: [
                ["Filter by Status", "Quickly filter work orders (All, Received, In Progress, Completed) using the top filter bar."],
                ["Add Parts & Labor (+ Item)", "Click '+ Item' to add spare parts (supports barcode scanning) or labor hours to the bill."],
                ["Customer Approval for Extra Work", "Check 'Additional work — requires customer approval' so the owner can approve extra costs online."],
                ["PDF Invoice (SR / EN) with QR Payment", "Click 📄 SR or 📄 EN to generate a branded PDF work order with a payment QR code."],
                ["One-Click WhatsApp Status Link", "Click 📱 WA to send the live repair tracking link directly to the customer's WhatsApp."]
            ]
        },
        "/dashboard": {
            title: "Dashboard — Workshop Analytics",
            steps: [
                ["Key Financial Metrics (KPI)", "Monitor monthly revenue, average order value (AOV), active vehicles, and all-time turnover."],
                ["Revenue Breakdown (Labor vs Parts)", "Track the ratio between service labor income and spare parts sales."],
                ["Mechanic Performance", "Compare completed work orders and revenue generated by each technician."]
            ]
        },
        "/inventory": {
            title: "Inventory — Quick Guide",
            steps: [
                ["Barcode Scanner & Stock Entry", "Use the camera barcode scanner or manually enter SKU, part name, selling price, and quantity."],
                ["Low Stock Alerts", "Items falling below the minimum stock threshold are automatically highlighted."],
                ["Automatic Stock Deduction", "Parts added to work orders are automatically deducted from your inventory."]
            ]
        },
        "/reminders": {
            title: "Automated Customer Reminders",
            steps: [
                ["Due Service Reminders", "View customers scheduled for regular maintenance or inspection reminders today."],
                ["Batch Processing", "Send all due notifications with a single click and review delivery status in the log."]
            ]
        },
        "/settings": {
            title: "Settings, Branding & License",
            steps: [
                ["White-Label Workshop Branding", "Set your workshop name, Tax ID, address, bank account, and upload your custom logo for the app and PDFs."],
                ["OBD-II & Bluetooth Diagnostics", "Select Simulation, Web Bluetooth, or Serial COM port to read ECU fault codes."],
                ["WhatsApp, Telegram & Invoicing", "Configure customer messaging templates and invoicing mode (Internal QR Invoice or Fiscal PFR)."]
            ]
        }
    }
};

function openHelpModal() {
    const lang = (window.I18n && I18n.currentLang) || localStorage.getItem("lang") || "sr";
    const path = window.location.pathname;
    const dict = HELP_DATA[lang] || HELP_DATA.sr;
    const data = dict[path] || dict["/"];

    let existing = document.getElementById("sm-help-info-modal");
    if (existing) existing.remove();

    const stepsHtml = data.steps.map((s, i) => `
        <div style="display:flex; gap:12px; align-items:flex-start; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; margin-bottom:8px;">
            <div style="min-width:26px; height:26px; border-radius:50%; background:#d97706; color:#fff; font-weight:800; font-size:0.82rem; display:flex; align-items:center; justify-content:center; margin-top:1px;">
                ${i + 1}
            </div>
            <div style="flex:1;">
                <div style="font-weight:700; color:#0f172a; font-size:0.9rem; margin-bottom:2px;">${s[0]}</div>
                <div style="color:#475569; font-size:0.83rem; line-height:1.38;">${s[1]}</div>
            </div>
        </div>
    `).join("");

    const modal = document.createElement("div");
    modal.id = "sm-help-info-modal";
    modal.className = "sm-obd-modal-backdrop";
    modal.innerHTML = `
        <div class="sm-obd-modal-box" style="max-width:540px;">
            <div class="sm-obd-header">
                <h3>💡 ${data.title}</h3>
                <button type="button" onclick="document.getElementById('sm-help-info-modal').remove()" style="background:transparent;border:none;color:#cbd5e1;font-size:1.5rem;cursor:pointer;line-height:1;">&times;</button>
            </div>
            <div class="sm-obd-body" style="padding:14px 16px;">
                ${stepsHtml}
            </div>
            <div class="sm-obd-footer">
                <button type="button" class="btn-secondary" style="width:auto;padding:7px 14px;" onclick="window.location.href='/help'">
                    📖 ${lang === "en" ? "Full Manual" : "Kompletno uputstvo"}
                </button>
                <button type="button" class="btn-primary" style="width:auto;padding:7px 18px;" onclick="document.getElementById('sm-help-info-modal').remove()">
                    ${lang === "en" ? "Got it" : "Razumem"}
                </button>
            </div>
        </div>
    `;
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

function initHelpButtons() {
    const header = document.querySelector("header");
    if (!header) return;

    // Ukloni stare dugmiće ako postoje da ih kreiramo čisto sa novim eventima
    header.querySelectorAll("#btn-help, #btn-guide").forEach(b => b.remove());

    const lang = (window.I18n && I18n.currentLang) || localStorage.getItem("lang") || "sr";
    const logoutBtn = header.querySelector("#btn-logout");

    const helpBtn = document.createElement("button");
    helpBtn.id = "btn-help";
    helpBtn.type = "button";
    helpBtn.className = "btn-secondary header-logout-btn";
    helpBtn.style.marginRight = "8px";
    helpBtn.setAttribute("data-i18n", "header.help");
    helpBtn.textContent = lang === "en" ? "❓ Help" : "❓ Pomoć";
    helpBtn.addEventListener("click", openHelpModal);

    const guideBtn = document.createElement("button");
    guideBtn.id = "btn-guide";
    guideBtn.type = "button";
    guideBtn.className = "btn-secondary header-logout-btn";
    guideBtn.style.marginRight = "8px";
    guideBtn.setAttribute("data-i18n", "header.guide");
    guideBtn.textContent = lang === "en" ? "📖 Guide" : "📖 Uputstvo";
    guideBtn.addEventListener("click", () => {
        window.location.href = "/help";
    });

    if (logoutBtn) {
        header.insertBefore(helpBtn, logoutBtn);
        header.insertBefore(guideBtn, logoutBtn);
    } else {
        header.appendChild(helpBtn);
        header.appendChild(guideBtn);
    }
}

document.addEventListener("DOMContentLoaded", initHelpButtons);