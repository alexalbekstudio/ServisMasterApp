const MANUAL_HTML = {
    sr: `
        <div class="manual-wrap">
            <h1>ServisMaster OS — Uputstvo za korišćenje</h1>
            <p class="manual-meta">Verzija 2.4 Commercial · Poslednja izmena: Novembar 2026.</p>

            <div class="manual-toc">
                <div class="manual-toc-title">Sadržaj (kliknite na sekciju za brzi skok)</div>
                <div class="manual-toc-grid">
                    <a href="#sec-1">1. Prvi koraci</a>
                    <a href="#sec-2">2. Prijem vozila</a>
                    <a href="#sec-3">3. Radni nalozi</a>
                    <a href="#sec-4">4. Magacin</a>
                    <a href="#sec-5">5. SMS podsetnici</a>
                    <a href="#sec-6">6. Kontrolna tabla</a>
                    <a href="#sec-7">7. Klijentski portal i PDF</a>
                    <a href="#sec-8">8. Podešavanja i Licenca</a>
                </div>
            </div>

            <div class="manual-sec" id="sec-1">
                <h2>1. Prvi koraci (Prijava i Registracija)</h2>
                <ul class="manual-list">
                    <li><strong>Prijava:</strong> Otvorite <span class="manual-code">http://localhost:8000/login</span>, unesite email i lozinku i kliknite <strong>Prijavi se</strong>.</li>
                    <li><strong>Registracija servisa:</strong> Otvorite <span class="manual-code">http://localhost:8000/register</span>, popunite podatke o radionici i vlasniku i kliknite <strong>Registruj servis</strong>.</li>
                    <li><strong>Promena jezika (SR / EN):</strong> Kliknite na dugme <strong>🇷🇸 SR / 🇬🇧 EN</strong> u zaglavlju za trenutni prevod kompletne aplikacije.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-2">
                <h2>2. Prijem vozila, OCR kamera i OBD-II</h2>
                <ul class="manual-list">
                    <li><strong>Pametna pretraga klijenta:</strong> Ukucajte 2 slova imena ili broja telefona u polje <em>Pretraga</em> ili <em>Ime i prezime</em> i izaberite postojećeg klijenta i vozilo iz padajuće liste.</li>
                    <li><strong>Skeniranje saobraćajne (OCR) i VIN:</strong> Kliknite na <strong>📷 Kamera Uživo</strong> ili <strong>📁 Izaberi Sliku</strong> za automatsko čitanje tablica, ili unesite 17-cifreni VIN broj.</li>
                    <li><strong>Zapisnik oštećenja:</strong> Izaberite tip oštećenja i kliknite direktno na dijagram karoserije da evidentirate ogrebotine ili udubljenja pre prijema.</li>
                    <li><strong>OBD-II dijagnostika:</strong> Kliknite na <strong>🔌 OBD-II</strong> u vrhu ekrana, očitajte DTC kodove grešaka i kliknite <strong>➕ Upiši u opis kvara</strong>.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-3">
                <h2>3. Radni nalozi</h2>
                <ul class="manual-list">
                    <li><strong>Promena statusa:</strong> Koristite padajući meni: <strong>Prijem → Dijagnostika → Čeka delove → U radu → Završeno → Preuzeto</strong>.</li>
                    <li><strong>Dodavanje stavki (+ Stavka):</strong> Izaberite <strong>⚙️ Rezervni deo</strong> (automatski skida sa stanja magacina) ili <strong>🔧 Usluga / Rad</strong> (dodaje rad na račun).</li>
                    <li><strong>Dodatni rad:</strong> Štiklirajte <strong>⚠️ Traži odobrenje</strong> ako je u pitanju naknadni kvar koji klijent treba da odobri preko svog telefona.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-4">
                <h2>4. Magacin delova</h2>
                <ul class="manual-list">
                    <li><strong>Unos artikla:</strong> Skenirajte barkod kamerom (<strong>📷 Skeniraj kod</strong>) ili unesite SKU šifru, naziv dela, prodajnu cenu, količinu i kritični minimum.</li>
                    <li><strong>Praćenje zaliha:</strong> Delovi čija količina padne ispod kritičnog minimuma automatski dobijaju crvenu oznaku za nabavku.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-5">
                <h2>5. SMS i Email podsetnici</h2>
                <ul class="manual-list">
                    <li><strong>Slanje podsetnika:</strong> Klikom na <strong>Pošalji sve dospele podsetnike danas</strong> sistem obaveštava klijente kojima dospeva redovan servis i beleži poruku u dnevnik.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-6">
                <h2>6. Kontrolna tabla (Analitika)</h2>
                <ul class="manual-list">
                    <li><strong>KPI pokazatelji i grafikoni:</strong> Pregled mesečnog prihoda, prosečnog računa (AOV), odnosa zarade Rad vs. Delovi, top 5 najprodavanijih delova i učinka majstora.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-7">
                <h2>7. Klijentski portal, PDF dokumenti i WhatsApp</h2>
                <ul class="manual-list">
                    <li><strong>PDF radni nalog (📄 SR / 📄 EN):</strong> Štampa zvaničan radni nalog na srpskom ili engleskom sa logotipom servisa i NBS IPS QR kodom za plaćanje.</li>
                    <li><strong>Deljenje sa klijentom:</strong> Kliknite na <strong>Link</strong> za otvaranje klijentskog portala ili <strong>📱 WA</strong> za direktno slanje linka na WhatsApp klijenta.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-8">
                <h2>8. Podešavanja, Fiskalizacija i Licenca</h2>
                <ul class="manual-list">
                    <li><strong>White-Label brendiranje:</strong> U tabu <strong>⚙️ Podešavanja</strong> unesite naziv vašeg servisa, PIB, MB, adresu, tekući račun i otpremite svoj logo.</li>
                    <li><strong>Notifikacije i PFR:</strong> Podesite uvodnu WhatsApp poruku, Telegram Bot Token, SMTP email i režim fiskalizacije (Interni QR račun ili LPFR/VPFR).</li>
                </ul>
            </div>
        </div>
    `,
    en: `
        <div class="manual-wrap">
            <h1>ServisMaster OS — User Manual</h1>
            <p class="manual-meta">Version 2.4 Commercial · Last updated: November 2026.</p>

            <div class="manual-toc">
                <div class="manual-toc-title">Table of Contents (click to jump to section)</div>
                <div class="manual-toc-grid">
                    <a href="#sec-1">1. Getting Started</a>
                    <a href="#sec-2">2. Vehicle Reception</a>
                    <a href="#sec-3">3. Work Orders</a>
                    <a href="#sec-4">4. Inventory</a>
                    <a href="#sec-5">5. SMS Reminders</a>
                    <a href="#sec-6">6. Dashboard</a>
                    <a href="#sec-7">7. Customer Portal & PDF</a>
                    <a href="#sec-8">8. Settings & License</a>
                </div>
            </div>

            <div class="manual-sec" id="sec-1">
                <h2>1. Getting Started (Login & Registration)</h2>
                <ul class="manual-list">
                    <li><strong>Sign In:</strong> Open <span class="manual-code">http://localhost:8000/login</span>, enter your email and password and click <strong>Sign In</strong>.</li>
                    <li><strong>Register Workshop:</strong> Open <span class="manual-code">http://localhost:8000/register</span>, fill in workshop and owner details and click <strong>Register Workshop</strong>.</li>
                    <li><strong>Language Switch (SR / EN):</strong> Click <strong>🇷🇸 SR / 🇬🇧 EN</strong> in the top header to switch the entire interface language instantly.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-2">
                <h2>2. Vehicle Reception, OCR Camera & OBD-II</h2>
                <ul class="manual-list">
                    <li><strong>Smart Customer Autocomplete:</strong> Type 2 letters of a customer's name or phone number in <em>Search</em> or <em>Full name</em> to auto-fill customer and vehicle data from the database.</li>
                    <li><strong>Registration Card OCR & VIN:</strong> Click <strong>📷 Live Camera</strong> or <strong>📁 Choose Image</strong> to scan plates automatically, or enter a 17-character VIN.</li>
                    <li><strong>Body Damage Report:</strong> Select damage type and click directly on the vehicle diagram to record scratches or dents upon reception.</li>
                    <li><strong>OBD-II Diagnostics:</strong> Click <strong>🔌 OBD-II</strong> in the header to scan ECU fault codes and click <strong>➕ Insert into Fault Description</strong>.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-3">
                <h2>3. Work Orders</h2>
                <ul class="manual-list">
                    <li><strong>Status Workflow:</strong> Use the dropdown menu: <strong>Received → Diagnostics → Waiting for parts → In progress → Completed → Delivered</strong>.</li>
                    <li><strong>Adding Items (+ Item):</strong> Choose <strong>⚙️ Spare Part</strong> (deducts from inventory stock) or <strong>🔧 Labor / Service</strong> (adds labor cost).</li>
                    <li><strong>Extra Work Approval:</strong> Check <strong>⚠️ Additional work — requires customer approval</strong> so the customer can approve extra repairs online.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-4">
                <h2>4. Inventory Management</h2>
                <ul class="manual-list">
                    <li><strong>Stock Entry:</strong> Scan a barcode via camera (<strong>📷 Scan Barcode</strong>) or enter SKU, part name, selling price, quantity and minimum stock alert.</li>
                    <li><strong>Low Stock Alerts:</strong> Parts falling below the minimum threshold are automatically highlighted for restocking.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-5">
                <h2>5. SMS & Email Reminders</h2>
                <ul class="manual-list">
                    <li><strong>Batch Reminders:</strong> Click <strong>Send All Due Reminders Today</strong> to notify vehicle owners scheduled for maintenance and log sent messages.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-6">
                <h2>6. Dashboard & Analytics</h2>
                <ul class="manual-list">
                    <li><strong>KPIs & Charts:</strong> Track monthly revenue, average ticket (AOV), Labor vs. Parts breakdown, top 5 best-selling parts and mechanic performance.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-7">
                <h2>7. Customer Portal, PDF Invoices & WhatsApp</h2>
                <ul class="manual-list">
                    <li><strong>PDF Work Order (📄 SR / 📄 EN):</strong> Generates a branded PDF invoice in Serbian or English with your workshop logo and instant payment QR code.</li>
                    <li><strong>Customer Sharing:</strong> Click <strong>Link</strong> to open the live customer tracking portal or <strong>📱 WA</strong> to send the tracking link via WhatsApp.</li>
                </ul>
            </div>

            <div class="manual-sec" id="sec-8">
                <h2>8. Settings, Fiscalization & License Tiers</h2>
                <ul class="manual-list">
                    <li><strong>White-Label Branding:</strong> In <strong>⚙️ Settings</strong>, enter your workshop name, Tax ID, address, bank account and upload your custom logo.</li>
                    <li><strong>Notifications & Fiscal PFR:</strong> Configure WhatsApp greeting text, Telegram Bot Token, SMTP email and invoicing mode (Internal QR Invoice or LPFR/VPFR).</li>
                </ul>
            </div>
        </div>
    `
};

function renderHelpManual() {
    const lang = (window.I18n && I18n.currentLang) || localStorage.getItem("lang") || "sr";
    const contentEl = document.getElementById("help-content") || document.querySelector("main .card") || document.querySelector("main");
    if (contentEl) {
        contentEl.innerHTML = MANUAL_HTML[lang] || MANUAL_HTML.sr;
        // Povezi sve linkove u Sadrzaju da glatko skroluju do odgovarajuce sekcije
        contentEl.querySelectorAll(".manual-toc-grid a").forEach(a => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = a.getAttribute("href").replace("#", "");
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }

    const titleEl = document.getElementById("help-header-title");
    if (titleEl) {
        titleEl.textContent = lang === "en" ? "User Manual" : "Uputstvo za korišćenje";
    }
    const backBtn = document.getElementById("btn-back");
    if (backBtn) {
        backBtn.textContent = lang === "en" ? "← Back" : "← Nazad";
    }
    const pdfBtn = document.getElementById("btn-download-pdf");
    if (pdfBtn) {
        pdfBtn.textContent = lang === "en" ? "📄 PDF" : "📄 PDF";
    }
}

window.renderHelpManual = renderHelpManual;

document.addEventListener("DOMContentLoaded", () => {
    renderHelpManual();
    setTimeout(renderHelpManual, 150);

    const backBtn = document.getElementById("btn-back");
    if (backBtn) {
        backBtn.onclick = (e) => {
            e.preventDefault();
            if (window.history.length > 1 && document.referrer) {
                window.history.back();
            } else {
                window.location.href = "/";
            }
        };
    }

    const pdfBtn = document.getElementById("btn-download-pdf");
    if (pdfBtn) {
        pdfBtn.onclick = async (e) => {
            e.preventDefault();
            const origText = pdfBtn.textContent;
            pdfBtn.textContent = "⏳...";
            try {
                const headers = (window.ApiService && ApiService.getHeaders) ? ApiService.getHeaders() : {};
                const res = await fetch("/api/v1/help/pdf", { headers });
                if (!res.ok) throw new Error("PDF error");
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            } catch (err) {
                window.print();
            } finally {
                pdfBtn.textContent = origText;
            }
        };
    }
});
