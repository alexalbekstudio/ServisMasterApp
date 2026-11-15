/**
 * i18n — Potpuna dvojezičnost (SR + EN), pametni Autocomplete za klijente/vozila iz baze,
 * prevod Klijentskog portala, Dashboard grafikona, Modala, OBD-II i WhatsApp šablona.
 */

const TRANSLATIONS = {
    sr: {
        "nav.reception": "Prijem Vozila",
        "nav.orders": "Nalozi u radu",
        "nav.dashboard": "Kontrolna Tabla",
        "nav.inventory": "Magacin",
        "nav.reminders": "SMS Podsetnici",
        "nav.settings": "⚙️ Podešavanja",
        "nav.admin": "Admin",
        "header.logout": "Odjava",
        "header.help": "❓ Pomoć",
        "header.guide": "📖 Uputstvo",

        "login.title": "Dobrodošli nazad",
        "login.subtitle": "Prijavite se na vaš ServisMaster OS nalog",
        "login.email": "Email adresa",
        "login.password": "Lozinka",
        "login.submit": "Prijavi se",
        "login.no_account": "Nemate nalog?",
        "login.register_link": "Registrujte svoj servis",
        "register.title": "Registrujte svoj servis",
        "register.subtitle": "Napravite nalog za vašu radionicu u 30 sekundi",
        "register.shop_section": "Podaci o servisu",
        "register.shop_name": "Naziv servisa",
        "register.shop_phone": "Telefon servisa",
        "register.shop_city": "Grad",
        "register.owner_section": "Podaci o vlasniku",
        "register.owner_name": "Ime i prezime",
        "register.owner_email": "Email adresa (za prijavu)",
        "register.owner_password": "Lozinka (min. 6 znakova)",
        "register.submit": "Registruj servis",
        "register.have_account": "Već imate nalog?",
        "register.login_link": "Prijavite se",

        "reception.customer_section": "1. Podaci o vlasniku",
        "reception.customer_search": "Pretraga postojećeg klijenta",
        "reception.customer_name": "Ime i prezime",
        "reception.customer_phone": "Telefon (za SMS)",
        "reception.vehicle_section": "2. Vozilo",
        "reception.ocr_title": "📷 Skeniraj saobraćajnu",
        "reception.ocr_camera": "📷 Kamera Uživo",
        "reception.ocr_file": "📁 Izaberi Sliku",
        "reception.ocr_manual": "✏️ Ručni unos",
        "reception.plate": "Registarska oznaka",
        "reception.make": "Marka",
        "reception.model": "Model",
        "reception.vin": "Broj šasije (VIN - 17 znakova)",
        "reception.damage_section": "3. Zapisnik oštećenja karoserije",
        "reception.damage_type": "Tip oštećenja",
        "reception.damage_desc": "Bliži opis",
        "reception.request_section": "4. Zahtev klijenta & Prijem",
        "reception.mileage": "Kilometraža (km)",
        "reception.fuel": "Nivo goriva",
        "reception.complaint": "Opis kvara",
        "reception.photo_url": "Slika (URL)",
        "reception.submit": "Kreiraj Radni Nalog",

        "orders.filter_all": "Svi nalozi",
        "orders.filter_received": "Prijem",
        "orders.filter_in_progress": "U radu",
        "orders.filter_completed": "Završeno",
        "orders.add_item": "+ Stavka",
        "orders.pdf_sr": "📄 SR",
        "orders.pdf_en": "📄 EN",
        "orders.link": "Link",
        "orders.whatsapp": "📱 WA",
        "orders.status_label": "Status popravke:",

        "dashboard.monthly_revenue": "Prihod ovog meseca",
        "dashboard.avg_ticket": "Prosečan račun (AOV)",
        "dashboard.active_orders": "Trenutno u radu",
        "dashboard.all_time": "Ukupan promet servisa",
        "dashboard.revenue_structure": "Struktura prihoda",
        "dashboard.labor": "Rad",
        "dashboard.parts": "Delovi",
        "dashboard.top_makes": "Najčešći modeli u servisu",
        "dashboard.mechanics": "👨‍🔧 Učinak majstora",
        "dashboard.monthly_chart": "📈 Prihod po mesecima",
        "dashboard.status_chart": "📊 Statusi naloga",
        "dashboard.top_parts_chart": "⚙️ Top 5 najprodavanijih delova",
        "dashboard.mechanics_chart": "👨‍🔧 Prihod po majstoru",

        "inventory.add_section": "+ Unos artikla na stanje",
        "inventory.scan": "📷 Skeniraj kod",
        "inventory.sku": "Šifra artikla / Barkod (SKU)",
        "inventory.name": "Naziv dela",
        "inventory.price": "Prodajna cena (RSD)",
        "inventory.qty": "Količina za upis",
        "inventory.min": "Kritični minimum",
        "inventory.submit": "Upiši na lager",
        "inventory.stock": "Stanje zaliha",
        "inventory.search": "🔍 Brza pretraga...",

        "reminders.due_title": "Dospeli podsetnici za danas",
        "reminders.due_desc": "Pokretanjem akcije, sistem proverava sve termine i šalje SMS/email vlasnicima.",
        "reminders.process": "Pošalji sve dospele podsetnike danas",
        "reminders.logs_title": "Dnevnik poslatih poruka",

        "settings.company_section": "🏢 1. Podaci o auto-servisu & Brendiranje (White-Label)",
        "settings.obd_section": "🔌 2. OBD-II & Bluetooth Čitač Grešaka (ELM327)",
        "settings.messaging_section": "💬 3. WhatsApp & Telegram Obaveštenja",
        "settings.fiscal_section": "🧾 4. Fiskalizacija i Računi (PFR Podešavanja)",
        "settings.smtp_section": "📧 5. SMTP Podešavanja za Email Podsetnike"
    },
    en: {
        "nav.reception": "Vehicle Reception",
        "nav.orders": "Work Orders",
        "nav.dashboard": "Dashboard",
        "nav.inventory": "Inventory",
        "nav.reminders": "SMS Reminders",
        "nav.settings": "⚙️ Settings",
        "nav.admin": "Admin",
        "header.logout": "Logout",
        "header.help": "❓ Help",
        "header.guide": "📖 Guide",

        "login.title": "Welcome Back",
        "login.subtitle": "Sign in to your ServisMaster OS account",
        "login.email": "Email address",
        "login.password": "Password",
        "login.submit": "Sign In",
        "login.no_account": "Don't have an account?",
        "login.register_link": "Register your workshop",
        "register.title": "Register your workshop",
        "register.subtitle": "Create an account for your workshop in 30 seconds",
        "register.shop_section": "Workshop Information",
        "register.shop_name": "Workshop name",
        "register.shop_phone": "Workshop phone",
        "register.shop_city": "City",
        "register.owner_section": "Owner Information",
        "register.owner_name": "Full name",
        "register.owner_email": "Email address (for login)",
        "register.owner_password": "Password (min. 6 characters)",
        "register.submit": "Register Workshop",
        "register.have_account": "Already have an account?",
        "register.login_link": "Sign In",

        "reception.customer_section": "1. Owner Information",
        "reception.customer_search": "Search existing customer",
        "reception.customer_name": "Full name",
        "reception.customer_phone": "Phone number (for SMS)",
        "reception.vehicle_section": "2. Vehicle Details",
        "reception.ocr_title": "📷 Scan Registration Card",
        "reception.ocr_camera": "📷 Live Camera",
        "reception.ocr_file": "📁 Choose Image",
        "reception.ocr_manual": "✏️ Manual Input",
        "reception.plate": "License plate",
        "reception.make": "Make",
        "reception.model": "Model",
        "reception.vin": "Chassis Number (VIN - 17 chars)",
        "reception.damage_section": "3. Body Damage Report",
        "reception.damage_type": "Damage type",
        "reception.damage_desc": "Detailed description",
        "reception.request_section": "4. Customer Request & Reception",
        "reception.mileage": "Mileage (km)",
        "reception.fuel": "Fuel level",
        "reception.complaint": "Fault / Service description",
        "reception.photo_url": "Photo (URL)",
        "reception.submit": "Create Work Order",

        "orders.filter_all": "All Orders",
        "orders.filter_received": "Received",
        "orders.filter_in_progress": "In Progress",
        "orders.filter_completed": "Completed",
        "orders.add_item": "+ Item",
        "orders.pdf_sr": "📄 SR",
        "orders.pdf_en": "📄 EN",
        "orders.link": "Link",
        "orders.whatsapp": "📱 WA",
        "orders.status_label": "Repair status:",

        "dashboard.monthly_revenue": "Monthly Revenue",
        "dashboard.avg_ticket": "Average Ticket (AOV)",
        "dashboard.active_orders": "Currently In Progress",
        "dashboard.all_time": "All-Time Revenue",
        "dashboard.revenue_structure": "Revenue Breakdown",
        "dashboard.labor": "Labor",
        "dashboard.parts": "Parts",
        "dashboard.top_makes": "Most Frequent Vehicle Models",
        "dashboard.mechanics": "👨‍🔧 Mechanic Performance",
        "dashboard.monthly_chart": "📈 Monthly Revenue",
        "dashboard.status_chart": "📊 Order Statuses",
        "dashboard.top_parts_chart": "⚙️ Top 5 Best-Selling Parts",
        "dashboard.mechanics_chart": "👨‍🔧 Revenue by Mechanic",

        "inventory.add_section": "+ Add Item to Stock",
        "inventory.scan": "📷 Scan Barcode",
        "inventory.sku": "Item SKU / Barcode",
        "inventory.name": "Part Name",
        "inventory.price": "Selling Price",
        "inventory.qty": "Quantity to Add",
        "inventory.min": "Minimum Stock Alert",
        "inventory.submit": "Add to Stock",
        "inventory.stock": "Current Stock",
        "inventory.search": "🔍 Quick search...",

        "reminders.due_title": "Reminders Due Today",
        "reminders.due_desc": "Running this action checks all scheduled appointments and sends SMS/email reminders to owners.",
        "reminders.process": "Send All Due Reminders Today",
        "reminders.logs_title": "Sent Messages Log",

        "settings.company_section": "🏢 1. Workshop Info & White-Label Branding",
        "settings.obd_section": "🔌 2. OBD-II & Bluetooth Diagnostic Scanner (ELM327)",
        "settings.messaging_section": "💬 3. WhatsApp & Telegram Notifications",
        "settings.fiscal_section": "🧾 4. Fiscalization & Invoicing (PFR Settings)",
        "settings.smtp_section": "📧 5. SMTP Email Reminder Settings"
    }
};

const DOM_TEXT_MAP = [
    ["Uputstvo za korišćenje", "User Manual"],
    ["Dobrodošli nazad", "Welcome Back"],
    ["Prijavite se na vaš ServisMasterOS nalog", "Sign in to your ServisMaster OS account"],
    ["Email adresa", "Email address"],
    ["Lozinka", "Password"],
    ["Prijavi se", "Sign In"],
    ["Nemate nalog?", "Don't have an account?"],
    ["Registrujte svoj servis", "Register your workshop"],
    ["Napravite nalog za vašu radionicu u 30 sekundi", "Create an account for your workshop in 30 seconds"],
    ["PODACI O SERVISU", "WORKSHOP INFORMATION"],
    ["Podaci o servisu", "Workshop Information"],
    ["Naziv servisa", "Workshop name"],
    ["Telefon servisa", "Workshop phone"],
    ["PODACI O VLASNIKU", "OWNER INFORMATION"],
    ["Podaci o vlasniku", "Owner Information"],
    ["Email adresa (za prijavu)", "Email address (for login)"],
    ["Lozinka (min. 6 znakova)", "Password (min. 6 characters)"],
    ["Registruj servis", "Register Workshop"],
    ["Već imate nalog?", "Already have an account?"],
    ["Prijavite se", "Sign In"],
    ["1. Podaci o vlasniku", "1. Owner Information"],
    ["Pretraga postojećeg klijenta", "Search existing customer"],
    ["Ime i prezime", "Full name"],
    ["Telefon (za SMS)", "Phone number (for SMS)"],
    ["2. Vozilo", "2. Vehicle Details"],
    ["📷 Skeniraj saobraćajnu", "📷 Scan Registration Card"],
    ["Automatski prepoznaje tablice, VIN i marku.", "Automatically extracts license plate, VIN and make."],
    ["📷 Kamera Uživo", "📷 Live Camera"],
    ["📁 Izaberi Sliku", "📁 Choose Image"],
    ["✏️ Ručni unos", "✏️ Manual Input"],
    ["Registarska oznaka", "License plate"],
    ["📖 Servisna knjižica", "📖 Service History"],
    ["Marka", "Make"],
    ["Model", "Model"],
    ["Broj šasije (VIN - 17 znakova)", "Chassis Number (VIN - 17 chars)"],
    ["3. Zapisnik oštećenja karoserije", "3. Body Damage Report"],
    ["Kliknite na dijagram da označite oštećenje:", "Click on the vehicle diagram to mark damage:"],
    ["Tip oštećenja", "Damage type"],
    ["Ogrebotina", "Scratch"],
    ["Udubljenje", "Dent"],
    ["Naprslina", "Crack / Broken"],
    ["Nedostaje deo", "Missing part"],
    ["Bliži opis", "Detailed description"],
    ["4. Zahtev klijenta & Prijem", "4. Customer Request & Reception"],
    ["Kilometraža (km)", "Mileage (km)"],
    ["Nivo goriva", "Fuel level"],
    ["Pun", "Full"],
    ["Opis kvara", "Fault / Service description"],
    ["Slika (URL)", "Photo (URL)"],
    ["Kreiraj Radni Nalog", "Create Work Order"],
    ["Skeniranje saobraćajne", "Scan Registration Card"],
    ["Uokvirite saobraćajnu", "Align registration card inside frame"],
    ["PRIJEM", "RECEPTION"],
    ["AKTIVNO", "ACTIVE"],
    ["Vozilo", "Vehicle"],
    ["← Nazad", "← Back"],
    ["ZALIHE", "STOCK"],
    ["CENTAR", "CENTER"],
    ["UPRAVA", "ADMIN"],
    ["Radni Nalozi", "Work Orders"],
    ["Kontrolna Tabla", "Dashboard"],
    ["Magacin", "Inventory"],
    ["Status Popravke", "Repair Status"],
    ["Status popravke:", "Repair status:"],
    ["Svi nalozi", "All Orders"],
    ["Prijem", "Received"],
    ["Dijagnostika", "Diagnostics"],
    ["Čeka delove", "Waiting for parts"],
    ["U radu", "In progress"],
    ["Završeno", "Completed"],
    ["Preuzeto", "Delivered"],
    ["+ Stavka", "+ Item"],
    ["Nema naloga za izabrani status.", "No work orders found for the selected status."],
    ["Učitavanje...", "Loading..."],
    ["Dodaj stavku na nalog", "Add Item to Work Order"],
    ["Tip stavke", "Item Type"],
    ["⚙️ Rezervni deo", "⚙️ Spare Part"],
    ["🔧 Usluga / Rad", "🔧 Labor / Service"],
    ["Naziv dela ili operacije", "Part Name or Service Operation"],
    ["Količina", "Quantity"],
    ["Cena (RSD)", "Unit Price"],
    ["⚠️ Dodatni rad — traži odobrenje", "⚠️ Additional work — requires customer approval"],
    ["Upiši stavku", "Save Item"],
    ["Prijavljeni problem", "Reported Issue"],
    ["Vremenska linija", "Repair Timeline"],
    ["Primljeno", "Received"],
    ["📥 Primljeno", "📥 Received"],
    ["Prethodno", "Previous"],
    ["Urađeni radovi i delovi", "Completed Work & Parts"],
    ["Foto-dokumentacija", "Photo Documentation"],
    ["+ Unos artikla na stanje", "+ Add Item to Stock"],
    ["Šifra artikla / Barkod (SKU)", "Item SKU / Barcode"],
    ["Naziv dela", "Part Name"],
    ["Prodajna cijena (RSD)", "Selling Price"],
    ["Prodajna cena (RSD)", "Selling Price"],
    ["Količina za upis", "Quantity to Add"],
    ["Kritični minimum", "Minimum Stock Alert"],
    ["Upiši na lager", "Add to Stock"],
    ["Stanje zaliha", "Current Stock"],
    ["Lager je prazan.", "Inventory is currently empty."],
    ["📷 Skeniraj kod", "📷 Scan Barcode"],
    ["📷 Skeniraj barkod", "📷 Scan Barcode"],
    ["Skeniraj barkod", "Scan Barcode"],
    ["📷 Skeniranje koda", "📷 Scan Barcode"],
    ["Usmerite kameru na barkod...", "Point camera at the barcode..."],
    ["Ili učitajte sliku koda:", "Or upload a barcode image:"],
    ["Dospeli podsetnici za danas", "Reminders Due Today"],
    ["Pokretanjem akcije, sistem proverava sve termine i šalje SMS/email vlasnicima.", "Running this action checks all scheduled appointments and sends SMS/email reminders to owners."],
    ["Pošalji sve dospele podsetnike danas", "Send All Due Reminders Today"],
    ["Dnevnik poslatih poruka", "Sent Messages Log"],
    ["Nema poslatih poruka.", "No messages sent yet."],
    ["po radnom nalogu", "per work order"],
    ["vozila na dizalici", "vehicles on lift"],
    ["kumulativno", "all-time cumulative"],
    ["Nema majstora u sistemu.", "No mechanics registered in the system."],
    ["Nema podataka o majstorima.", "No mechanic performance data available."],
    ["📊 Statusi naloga", "📊 Order Statuses"],
    ["⚙️ Top 5 najprodavanijih delova", "⚙️ Top 5 Best-Selling Parts"],
    ["👨‍🔧 Prihod po majstoru", "👨‍🔧 Revenue by Mechanic"],
    ["7 dana", "7 days"],
    ["30 dana", "30 days"],
    ["90 dana", "90 days"],
    ["🏢 1. Podaci o auto-servisu & Brendiranje (White-Label)", "🏢 1. Workshop Info & White-Label Branding"],
    ["Naziv auto-servisa", "Workshop Name"],
    ["PIB / Poreski broj", "Tax ID (PIB)"],
    ["Matični broj (MB)", "Registration No. (MB)"],
    ["Ulica i broj", "Street Address"],
    ["Grad", "City"],
    ["Telefon servisa", "Workshop Phone"],
    ["Tekući račun (za NBS IPS QR kod)", "Bank Account (IBAN / IPS QR)"],
    ["Valuta prikaza", "Display Currency"],
    ["Logo servisa i Favicon (PNG/JPG)", "Workshop Logo & Favicon (PNG/JPG)"],
    ["Ukloni logo", "Remove Logo"],
    ["Licencni ključ (Activation Key)", "License Key (Activation Key)"],
    ["🔌 2. OBD-II & Bluetooth Čitač Grešaka (ELM327)", "🔌 2. OBD-II & Bluetooth Diagnostic Scanner (ELM327)"],
    ["Režim povezivanja dijagnostike", "Diagnostic Connection Mode"],
    ["Simulacija / Ručni unos DTC kodova (Bez hardvera)", "Simulation / Manual DTC Input (No Hardware)"],
    ["Web Bluetooth (ELM327 BLE direktno iz pretraživača)", "Web Bluetooth (ELM327 BLE via Browser)"],
    ["USB / Bluetooth Serial COM Port (ELM327)", "USB / Bluetooth Serial COM Port (ELM327)"],
    ["COM Port (za Serial/Bluetooth režim)", "COM Port (for Serial/Bluetooth)"],
    ["🔍 Testiraj OBD-II / Očitaj greške", "🔍 Test OBD-II / Read DTC Faults"],
    ["📶 Upari Bluetooth OBD uređaj (Chrome/Edge)", "📶 Pair Bluetooth OBD Device (Chrome/Edge)"],
    ["ℹ️ Bluetooth uparivanje otkazano ili uređaj nije pronađen.", "ℹ️ Bluetooth pairing cancelled or device not found."],
    ["💬 3. WhatsApp & Telegram Obaveštenja", "💬 3. WhatsApp & Telegram Notifications"],
    ["WhatsApp poruke klijentima", "WhatsApp Customer Messages"],
    ["Uključeno (Prikaži 📱 WA dugme na nalozima)", "Enabled (Show 📱 WA button on orders)"],
    ["Isključeno", "Disabled"],
    ["WhatsApp broj servisa (opciono)", "Workshop WhatsApp Number (optional)"],
    ["Tekst uvodne WhatsApp poruke klijentu", "WhatsApp Greeting Message Template"],
    ["Telegram Bot Obaveštenja", "Telegram Bot Alerts"],
    ["Uključeno (Šalji alarme na Telegram)", "Enabled (Send alerts to Telegram)"],
    ["🧾 4. Fiskalizacija i Računi (PFR Podešavanja)", "🧾 4. Fiscalization & Invoicing (PFR Settings)"],
    ["Način izdavanja računa", "Invoicing Mode"],
    ["Interni servisni račun + NBS IPS QR (Bez PFR kase)", "Internal Service Invoice + QR Code (No Fiscal Device)"],
    ["Lokalni PFR uređaj (LPFR — eFiskalizacija)", "Local PFR Device (LPFR — eFiscalization)"],
    ["Cloud / Virtuelni PFR (VPFR)", "Cloud / Virtual PFR (VPFR)"],
    ["PAC kod (PFR pristupni kod)", "PAC Code (PFR Access Code)"],
    ["Kasir / Serviser na računu", "Cashier / Technician Name"],
    ["📧 5. SMTP Podešavanja za Email Podsetnike", "📧 5. SMTP Email Reminder Settings"],
    ["💾 Sačuvaj sva podešavanja", "💾 Save All Settings"]
];

const PLACEHOLDER_MAP = [
    ["Ime ili telefon...", "Name or phone..."],
    ["npr. Marko Marković", "e.g. John Smith"],
    ["npr. 0641234567", "e.g. +381641234567"],
    ["npr. PA-123-AA", "e.g. BG-123-AA"],
    ["NPR. PA-123-AA", "E.G. BG-123-AA"],
    ["npr. Renault", "e.g. Renault"],
    ["npr. Megane III", "e.g. Megane III"],
    ["npr. VF1JZ000055123456", "e.g. VF1JZ000055123456"],
    ["NPR. VF1JZ000055123456", "E.G. VF1JZ000055123456"],
    ["npr. duboka ogrebotina", "e.g. deep scratch on door"],
    ["npr. 185000", "e.g. 185000"],
    ["npr. Mali servis...", "e.g. Oil & filter change, front brake pads..."],
    ["Počnite unos...", "Start typing part or service..."],
    ["npr. 1500", "e.g. 1500"],
    ["npr. 1200", "e.g. 1200"],
    ["npr. 4011558000123", "e.g. 4011558000123"],
    ["npr. Filter ulja Mann W712", "e.g. Oil Filter Mann W712"],
    ["Ulica i broj", "Street and number"],
    ["Poštovani, status vašeg vozila možete pratiti na linku:", "Dear customer, you can track your vehicle repair status at:"],
    ["🔍 Brza pretraga...", "🔍 Quick search..."]
];

const DYNAMIC_PHRASES = [
    ["Mali servis (zamena ulja i svih filtera)", "Minor Service (Oil & All Filters Replacement)"],
    ["Zamena desne spone i centriranje trapa", "Right Tie Rod Replacement & Wheel Alignment"],
    ["Motorno ulje Elf Evolution 5W-30 (5L)", "Engine Oil Elf Evolution 5W-30 (5L)"],
    ["Filter ulja Mann W75/3", "Oil Filter Mann W75/3"],
    ["Desna spona Lemförder", "Right Tie Rod End Lemförder"],
    ["Veliki servis (set zupčenja + vodena pumpa - rad)", "Major Service (Timing Belt Kit & Water Pump - Labor)"],
    ["Set zupčastog kaiša sa vodenom pumpom Continental", "Timing Belt & Water Pump Kit Continental"],
    ["Prednje kočione pločice ATE", "Front Brake Pads ATE"],
    ["Zamena kočionih pločica", "Brake Pads Replacement (Labor)"],
    ["Kompjuterska OBD-II dijagnostika i očitavanje parametara", "Computer OBD-II Diagnostics & Live Parameter Scan"],
    ["Ultrazvučno čišćenje EGR ventila", "Ultrasonic EGR Valve Cleaning"],
    ["Skidanje menjača i zamena seta kvačila sa zamajcem", "Gearbox Removal & Clutch/Flywheel Replacement"],
    ["Plivajući zamajac + set kvačila LuK", "Dual-Mass Flywheel & Clutch Kit LuK"],
    ["Servis i dopuna auto-klime (R134a)", "A/C Service & Refrigerant Recharge (R134a)"],
    ["Filter kabine sa aktivnim ugljem Mahle", "Activated Carbon Cabin Filter Mahle"],
    ["Detektovano preskakanje paljenja.", "Misfire detected."],
    ["Lupa u prednjem trapu pri prelasku preko ležećih policajaca. Odraditi i redovan mali servis.", "Front suspension knocking noise over speed bumps. Perform regular oil & filter service."],
    ["Redovan veliki servis + zamena prednjih i zadnjih kočionih pločica.", "Regular major service + front and rear brake pads replacement."],
    ["Pali se Check Engine lampica na autoputu, slabije vuče uzbrdo. Proveriti EGR i DPF.", "Check Engine light comes on at highway speeds, loss of power uphill. Inspect EGR and DPF."],
    ["Vibracije pri polasku i gašenju motora. Sumnja na plivajući zamajac i set kvačila.", "Vibrations when starting off and shutting down engine. Suspected dual-mass flywheel and clutch wear."],
    ["Dopuna klime, dezinfekcija kabine ozonom i zamena polen filtera sa aktivnim ugljem.", "A/C recharge, ozone cabin disinfection and activated carbon cabin filter replacement."]
];

const I18n = {
    currentLang: localStorage.getItem("lang") || "sr",

    t(key) {
        return TRANSLATIONS[this.currentLang]?.[key] || TRANSLATIONS["sr"][key] || key;
    },

    setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.currentLang = lang;
        localStorage.setItem("lang", lang);
        this.translatePage();
        this.updateLangButton();
        if (window.renderHelpManual) window.renderHelpManual();
    },

    toggleLang() {
        this.setLang(this.currentLang === "sr" ? "en" : "sr");
    },

    translatePage() {
        const isEn = this.currentLang === "en";

        // 1. Prevedi sve data-i18n elemente
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const translation = this.t(key);
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });

        // 2. Prevedi sve tekstualne elemente (uključujući dugmad sa ikonicama)
        document.querySelectorAll("label, h1, h2, h3, p, a, button, option, span, div, .ocr-title, .ocr-subtitle, .status-label").forEach(el => {
            if (el.children.length > 0 && el.tagName !== "LABEL" && el.tagName !== "BUTTON" && !el.classList.contains("badge")) return;
            const txt = el.textContent.trim();
            if (!txt) return;
            for (const [srTxt, enTxt] of DOM_TEXT_MAP) {
                if (isEn && txt === srTxt) {
                    el.textContent = enTxt;
                    break;
                } else if (!isEn && txt === enTxt) {
                    el.textContent = srTxt;
                    break;
                }
            }
        });

        // 3. Prevedi placeholdere
        document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(inp => {
            const ph = inp.getAttribute("placeholder");
            for (const [srPh, enPh] of PLACEHOLDER_MAP) {
                if (isEn && ph === srPh) {
                    inp.setAttribute("placeholder", enPh);
                    break;
                } else if (!isEn && ph === enPh) {
                    inp.setAttribute("placeholder", srPh);
                    break;
                }
            }
        });

        // 4. Prevedi WhatsApp šablon u Settings input polju (Slika 11)
        const waGreetingInput = document.getElementById("set-wa-greeting");
        if (waGreetingInput) {
            const srWa = "Poštovani, status vašeg vozila možete pratiti na linku:";
            const enWa = "Dear customer, you can track your vehicle repair status at:";
            if (isEn && waGreetingInput.value.trim() === srWa) {
                waGreetingInput.value = enWa;
            } else if (!isEn && waGreetingInput.value.trim() === enWa) {
                waGreetingInput.value = srWa;
            }
        }

        // 5. Prevedi složene dinamičke tekstove (Klijentski portal Slika 5, Dashboard Slike 6-7, SMS Slika 8, Nalozi)
        document.querySelectorAll("p, li, span.badge, div, strong").forEach(el => {
            if (el.children.length > 2) return;
            let html = el.innerHTML;
            let changed = false;

            const replacements = isEn ? [
                [/NALOG #(\d+)/g, "ORDER #$1"],
                [/Prijem:\s*<strong>/g, "Received: <strong>"],
                [/Završetak:\s*<strong>U toku<\/strong>/g, "Completion: <strong>In progress</strong>"],
                [/Završetak:\s*<strong>/g, "Completion: <strong>"],
                [/📥\s*Primljeno/g, "📥 Received"],
                [/\((\d+\.\d+)\s*kom\)/g, "($1 pcs)"],
                [/Ukupno:\s*0,00\s*RSD/g, ""],
                [/Ukupno:\s*/g, "Total: "],
                [/(\d+)\s+završenih naloga/g, "$1 completed orders"],
                [/(\d+)\s+SERVISA/g, "$1 SERVICES"],
                [/Rad:\s*<strong>/g, "Labor: <strong>"],
                [/Delovi:\s*<strong>/g, "Parts: <strong>"],
                [/Obrada završena!\s*Poslato:\s*(\d+),\s*Neuspešno:\s*(\d+)/g, "Processing complete! Sent: $1, Failed: $2"],
                [/Kilometraža:/g, "Mileage:"],
                [/Gorivo:/g, "Fuel:"],
                [/Račun do sada:/g, "Total so far:"]
            ] : [
                [/ORDER #(\d+)/g, "NALOG #$1"],
                [/Received:\s*<strong>/g, "Prijem: <strong>"],
                [/Completion:\s*<strong>In progress<\/strong>/g, "Završetak: <strong>U toku</strong>"],
                [/Completion:\s*<strong>/g, "Završetak: <strong>"],
                [/📥\s*Received/g, "📥 Primljeno"],
                [/\((\d+\.\d+)\s*pcs\)/g, "($1 kom)"],
                [/Total:\s*/g, "Ukupno: "],
                [/(\d+)\s+completed orders/g, "$1 završenih naloga"],
                [/(\d+)\s+SERVICES/g, "$1 SERVISA"],
                [/Labor:\s*<strong>/g, "Rad: <strong>"],
                [/Parts:\s*<strong>/g, "Delovi: <strong>"],
                [/Processing complete!\s*Sent:\s*(\d+),\s*Failed:\s*(\d+)/g, "Obrada završena! Poslato: $1, Neuspešno: $2"],
                [/Mileage:/g, "Kilometraža:"],
                [/Fuel:/g, "Gorivo:"],
                [/Total so far:/g, "Račun do sada:"]
            ];

            for (const [regex, repl] of replacements) {
                if (regex.test(html)) {
                    html = html.replace(regex, repl);
                    changed = true;
                }
            }

            for (const [srP, enP] of DYNAMIC_PHRASES) {
                if (isEn && html.includes(srP)) {
                    html = html.replace(srP, enP);
                    changed = true;
                } else if (!isEn && html.includes(enP)) {
                    html = html.replace(enP, srP);
                    changed = true;
                }
            }

            if (changed) el.innerHTML = html;
        });

        // 6. Prevedi Chart.js grafikone na Kontrolnoj tabli (Slika 7)
        if (window.Chart && Chart.instances) {
            Object.values(Chart.instances).forEach(chart => {
                if (!chart || !chart.data || !chart.data.labels) return;
                chart.data.labels = chart.data.labels.map(lbl => {
                    if (isEn) {
                        if (lbl === "Prijem") return "Received";
                        if (lbl === "U radu") return "In Progress";
                        if (lbl === "Završeno") return "Completed";
                        if (lbl.startsWith("Filter kabine")) return "Cabin Filter Mahle...";
                        if (lbl.startsWith("Prednje kočione")) return "Front Brake Pads ATE...";
                        if (lbl.startsWith("Set zupčastog")) return "Timing Belt Kit...";
                        if (lbl.startsWith("Motorno ulje")) return "Engine Oil 5W-30...";
                        if (lbl.startsWith("Filter ulja")) return "Oil Filter Mann...";
                    } else {
                        if (lbl === "Received") return "Prijem";
                        if (lbl === "In Progress") return "U radu";
                        if (lbl === "Completed") return "Završeno";
                        if (lbl === "Cabin Filter Mahle...") return "Filter kabine sa akt...";
                        if (lbl === "Front Brake Pads ATE...") return "Prednje kočione ploč...";
                        if (lbl === "Timing Belt Kit...") return "Set zupčastog kaiša ...";
                    }
                    return lbl;
                });
                chart.update();
            });
        }
    },

    updateLangButton() {
        const btn = document.getElementById("btn-lang");
        if (btn) {
            btn.textContent = this.currentLang === "sr" ? "🇷🇸 SR" : "🇬🇧 EN";
        }
    },

    addLangButton() {
        if (document.getElementById("btn-lang")) return;

        const btn = document.createElement("button");
        btn.id = "btn-lang";
        btn.type = "button";
        btn.className = "btn-secondary header-logout-btn";
        btn.textContent = this.currentLang === "sr" ? "🇷🇸 SR" : "🇬🇧 EN";
        btn.addEventListener("click", () => this.toggleLang());

        const header = document.querySelector("header");
        if (header) {
            btn.style.marginRight = "8px";
            const logoutBtn = header.querySelector("#btn-logout");
            if (logoutBtn) {
                header.insertBefore(btn, logoutBtn);
            } else {
                header.appendChild(btn);
            }
        } else {
            btn.style.position = "fixed";
            btn.style.top = "16px";
            btn.style.right = "16px";
            btn.style.zIndex = "9999";
            btn.style.width = "auto";
            btn.style.padding = "8px 14px";
            document.body.appendChild(btn);
        }
    }
};

// Pametni Autocomplete za polja "Search existing customer", "Full name" i "Phone" (Slika 2)
async function initSmartCustomerAutocomplete() {
    if (window.location.pathname !== "/") return;

    const inputs = Array.from(document.querySelectorAll("input[type='text'], input[type='tel'], input:not([type])")).slice(0, 3);
    if (inputs.length < 2) return;

    let cachedRecords = [];
    try {
        const headers = (window.ApiService && ApiService.getHeaders) ? ApiService.getHeaders() : {};
        const res = await fetch("/api/v1/work-orders/", { headers });
        if (res.ok) {
            const orders = await res.json();
            const map = new Map();
            orders.forEach(o => {
                const name = o.customer_name || (o.customer && o.customer.full_name) || "";
                const phone = o.customer_phone || (o.customer && o.customer.phone) || "";
                const plate = o.license_plate || (o.vehicle && o.vehicle.license_plate) || "";
                const make = o.vehicle_make || (o.vehicle && o.vehicle.make) || "";
                const model = o.vehicle_model || (o.vehicle && o.vehicle.model) || "";
                const vin = o.vin || (o.vehicle && o.vehicle.vin) || "";
                if (name && !map.has(name.toLowerCase())) {
                    map.set(name.toLowerCase(), { name, phone, plate, make, model, vin, customer_id: o.customer_id });
                }
            });
            cachedRecords = Array.from(map.values());
        }
    } catch (e) {}

    // Dodaj i poznate klijente iz demo baze kao rezervu ako API vraća skraćenu šemu
    const fallbackDemo = [
        { name: "Nikola Lukić", phone: "+381641112233", plate: "PA-123-AA", make: "Renault", model: "Megane III 1.5 dCi", vin: "VF1JZ000055123456" },
        { name: "Marko Petrović", phone: "+381632223344", plate: "BG-987-XY", make: "Volkswagen", model: "Passat B8 2.0 TDI", vin: "WVWZZZ3CZGE112233" },
        { name: "Jelena Jovanović", phone: "+381653334455", plate: "NS-456-CD", make: "Škoda", model: "Octavia A7 1.6 TDI", vin: "TMBJJ7NE0F0998877" },
        { name: "Dragan Ilić", phone: "+381604445566", plate: "PA-777-TT", make: "Audi", model: "A4 2.0 TDI Quattro", vin: "WAUZZZ8K9DA445566" },
        { name: "Milan Stojanović", phone: "+381695556677", plate: "KG-321-MM", make: "BMW", model: "320d F30", vin: "WBA3D31050F778899" }
    ];
    fallbackDemo.forEach(d => {
        if (!cachedRecords.some(r => r.name.toLowerCase() === d.name.toLowerCase())) {
            cachedRecords.push(d);
        }
    });

    inputs.forEach(input => {
        input.setAttribute("autocomplete", "off");
        input.parentElement.style.position = "relative";

        let box = document.createElement("div");
        box.className = "sm-autocomplete-dropdown";
        box.style.cssText = "display:none; position:absolute; left:0; right:0; top:100%; z-index:2000; background:#fff; border:1px solid #cbd5e1; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.12); max-height:210px; overflow-y:auto; margin-top:4px;";
        input.parentElement.appendChild(box);

        input.addEventListener("input", () => {
            const q = input.value.trim().toLowerCase();
            if (q.length < 2) {
                box.style.display = "none";
                return;
            }
            const matches = cachedRecords.filter(r =>
                r.name.toLowerCase().includes(q) ||
                (r.phone && r.phone.toLowerCase().includes(q)) ||
                (r.plate && r.plate.toLowerCase().includes(q))
            );
            if (!matches.length) {
                box.style.display = "none";
                return;
            }

            box.innerHTML = matches.map((m, idx) => `
                <div data-idx="${idx}" style="padding:9px 12px; cursor:pointer; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; font-size:0.86rem;">
                    <div>
                        <strong style="color:#0f172a;">👤 ${m.name}</strong>
                        <span style="color:#64748b; margin-left:6px;">${m.phone}</span>
                    </div>
                    <span style="background:#fef3c7; color:#b45309; font-weight:700; padding:2px 8px; border-radius:6px; font-size:0.76rem;">
                        🚗 ${m.plate || ""} ${m.make || ""}
                    </span>
                </div>
            `).join("");
            box.style.display = "block";

            box.querySelectorAll("[data-idx]").forEach(itemEl => {
                itemEl.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    const rec = matches[Number(itemEl.getAttribute("data-idx"))];
                    if (inputs[0]) inputs[0].value = `${rec.name} (${rec.phone})`;
                    if (inputs[1]) inputs[1].value = rec.name;
                    if (inputs[2]) inputs[2].value = rec.phone;

                    // Automatski popuni i vozilo ako polja postoje na formi
                    const allInputs = Array.from(document.querySelectorAll("input[type='text'], input:not([type])"));
                    const plateInp = document.getElementById("license-plate") || allInputs[3];
                    const makeInp = document.getElementById("vehicle-make") || allInputs[4];
                    const modelInp = document.getElementById("vehicle-model") || allInputs[5];
                    const vinInp = document.getElementById("vehicle-vin") || allInputs[6];

                    if (plateInp && rec.plate) plateInp.value = rec.plate;
                    if (makeInp && rec.make) makeInp.value = rec.make;
                    if (modelInp && rec.model) modelInp.value = rec.model;
                    if (vinInp && rec.vin) vinInp.value = rec.vin;

                    box.style.display = "none";
                });
            });
        });

        input.addEventListener("blur", () => {
            setTimeout(() => { box.style.display = "none"; }, 180);
        });
    });
}

function injectCustomStyles() {
    if (document.getElementById("sm-custom-commercial-css")) return;
    const style = document.createElement("style");
    style.id = "sm-custom-commercial-css";
    style.textContent = `
        .brand-logo { max-height: 38px; width: auto; border-radius: 6px; object-fit: contain; margin-right: 10px; }
        .sm-obd-modal-backdrop {
            position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(3px); display: flex; align-items: center; justify-content: center;
            z-index: 9999; padding: 16px;
        }
        .sm-obd-modal-box {
            background: #ffffff; color: #0f172a; width: 100%; max-width: 520px;
            border-radius: 14px; box-shadow: 0 20px 40px rgba(0,0,0,0.25);
            border: 1px solid #e2e8f0; overflow: hidden; animation: smFadeIn 0.18s ease-out;
        }
        @keyframes smFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .sm-obd-header {
            background: #0f172a; color: #fff; padding: 14px 18px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .sm-obd-header h3 { margin: 0; font-size: 1.02rem; display: flex; align-items: center; gap: 8px; color: #fff; }
        .sm-obd-body { padding: 16px 18px; max-height: 72vh; overflow-y: auto; }
        .sm-dtc-item {
            background: #f8fafc; border-left: 4px solid #ef4444; border-radius: 8px;
            padding: 10px 12px; margin-bottom: 10px; border-top: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;
        }
        .sm-dtc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .sm-dtc-code { font-family: monospace; font-size: 0.98rem; font-weight: 800; color: #b91c1c; background: #fee2e2; padding: 2px 8px; border-radius: 5px; }
        .sm-dtc-sys { font-size: 0.74rem; font-weight: 700; color: #475569; text-transform: uppercase; }
        .sm-dtc-desc { font-size: 0.85rem; color: #1e293b; margin: 0; line-height: 1.35; }
        .sm-obd-footer { padding: 12px 18px; background: #f1f5f9; display: flex; justify-content: flex-end; gap: 8px; }
    `;
    document.head.appendChild(style);
}

window.showObdModal = function (title, bodyHtml, footerButtonsHtml = "") {
    let existing = document.getElementById("sm-obd-modal");
    if (existing) existing.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "sm-obd-modal";
    wrapper.className = "sm-obd-modal-backdrop";
    wrapper.innerHTML = `
        <div class="sm-obd-modal-box">
            <div class="sm-obd-header">
                <h3>${title}</h3>
                <button type="button" onclick="document.getElementById('sm-obd-modal').remove()" style="background:transparent;border:none;color:#cbd5e1;font-size:1.4rem;cursor:pointer;line-height:1;">&times;</button>
            </div>
            <div class="sm-obd-body">${bodyHtml}</div>
            <div class="sm-obd-footer">
                ${footerButtonsHtml}
                <button type="button" class="btn-primary" style="width:auto;padding:8px 18px;" onclick="document.getElementById('sm-obd-modal').remove()">
                    ${I18n.currentLang === "en" ? "Close" : "Zatvori"}
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(wrapper);
};

window.insertObdIntoComplaint = function () {
    const target = document.getElementById("complaint")
        || document.getElementById("order-complaint")
        || document.querySelector("textarea");

    if (target && window.__lastObdSummary) {
        target.value = (target.value ? target.value.trim() + "\n" : "") + window.__lastObdSummary;
        target.focus();
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const modal = document.getElementById("sm-obd-modal");
    if (modal) modal.remove();
};

window.triggerObdDiagnosticModal = async function () {
    const isEn = I18n.currentLang === "en";
    try {
        const res = await fetch("/api/v1/settings/obd/scan");
        const data = await res.json();
        if (!res.ok) {
            window.showObdModal(
                isEn ? "❌ OBD-II Connection Error" : "❌ Greška OBD-II konekcije",
                `<p style="color:#b91c1c;font-weight:600;margin:0;">${data.detail || "Uređaj nije dostupan."}</p>`
            );
            return;
        }

        const dtcTranslations = {
            "P0300": {
                sysSr: "MOTOR / PALJENJE",
                sysEn: "ENGINE / IGNITION",
                descSr: "Detektovano preskakanje paljenja na više cilindara (Random/Multiple Cylinder Misfire)",
                descEn: "Random/Multiple Cylinder Misfire Detected (Check spark plugs, coils, or injectors)"
            },
            "P0171": {
                sysSr: "SMEŠA GORIVA / USIS",
                sysEn: "FUEL TRIM / INTAKE",
                descSr: "Siromašna smeša goriva - Bank 1 (MAF senzor ili falš vazduh u usisu)",
                descEn: "System Too Lean Bank 1 (Check MAF sensor or vacuum leak)"
            }
        };

        const dtcList = (data.dtc || []).map(d => {
            const tr = dtcTranslations[d.code];
            if (tr) {
                return {
                    code: d.code,
                    system: isEn ? tr.sysEn : tr.sysSr,
                    description: isEn ? tr.descEn : tr.descSr
                };
            }
            return d;
        });

        const modeBadge = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:0.8rem;color:#475569;background:#f1f5f9;padding:6px 10px;border-radius:6px;">
            <span><strong>${isEn ? "Interface:" : "Interfejs:"}</strong> ${data.port}</span>
            <span><strong>${isEn ? "Mode:" : "Režim:"}</strong> ${data.mode.toUpperCase()}</span>
        </div>`;

        const cardsHtml = dtcList.length
            ? dtcList.map(d => `
                <div class="sm-dtc-item">
                    <div class="sm-dtc-top">
                        <span class="sm-dtc-code">${d.code}</span>
                        <span class="sm-dtc-sys">${d.system || "ECU"}</span>
                    </div>
                    <p class="sm-dtc-desc">${d.description}</p>
                </div>
            `).join("")
            : `<p style="color:#059669;font-weight:700;">✅ ${isEn ? "No fault codes found in ECU memory (0 DTC)." : "Nema zabeleženih grešaka u memoriji računara vozila (0 DTC)."}</p>`;

        const hasTextarea = document.getElementById("complaint") || document.getElementById("order-complaint") || document.querySelector("textarea");
        let extraBtn = "";
        if (hasTextarea && dtcList.length > 0) {
            window.__lastObdSummary = dtcList.map(d => `[OBD ${d.code}] ${d.description}`).join("\n");
            extraBtn = `<button type="button" class="btn-secondary" style="width:auto;padding:8px 14px;" onclick="window.insertObdIntoComplaint()">
                ➕ ${isEn ? "Insert into Fault Description" : "Upiši u opis kvara"}
            </button>`;
        }

        window.showObdModal(
            isEn ? "🔌 OBD-II ECU Diagnostic Report" : "🔌 OBD-II Dijagnostički Izveštaj",
            modeBadge + cardsHtml,
            extraBtn
        );
    } catch (e) {
        window.showObdModal("OBD-II", `<p style="color:#b91c1c;">${isEn ? "Server communication error." : "Greška pri komunikaciji sa serverom."}</p>`);
    }
};

window.applyServisMasterBrandingAndTiers = function (settings, hasCustomLogo) {
    const compName = (settings && settings.company_name && settings.company_name.trim())
        ? settings.company_name.trim()
        : "ServisMaster OS";
    const tier = ((settings && settings.license_tier) || "ultimate").toLowerCase();

    document.querySelectorAll(".brand-subtext-img").forEach(el => el.style.display = "none");
    document.querySelectorAll(".brand-logo, .sm-company-logo, img[src*='logo-a']").forEach(img => {
        if (hasCustomLogo) {
            img.src = "/company-logo.png?t=" + Date.now();
            img.style.display = "inline-block";
            img.style.maxHeight = "44px";
        } else {
            img.style.display = "none";
        }
    });

    if (hasCustomLogo) {
        let fav = document.querySelector("link[rel~='icon']");
        if (!fav) {
            fav = document.createElement("link");
            fav.rel = "icon";
            document.head.appendChild(fav);
        }
        fav.href = "/company-logo.png?t=" + Date.now();
    }

    const headerTitle = document.querySelector("header h1");
    if (headerTitle && window.location.pathname !== "/help") {
        headerTitle.textContent = compName;
    }

    const nav = document.querySelector("nav.nav-links");
    if (nav) {
        nav.querySelectorAll('a[href="/admin"]').forEach(a => a.style.display = "none");
        if (!nav.querySelector('a[href="/settings"]')) {
            const link = document.createElement("a");
            link.href = "/settings";
            link.className = "nav-link" + (window.location.pathname === "/settings" ? " active" : "");
            link.setAttribute("data-i18n", "nav.settings");
            link.textContent = I18n.t("nav.settings");
            nav.appendChild(link);
        }
    }

    const liveCamBtn = document.getElementById("btn-open-live-cam");
    if (liveCamBtn) liveCamBtn.style.display = "inline-flex";

    const isProOrAbove = tier === "pro" || tier === "ultimate";
    const isUltimate = tier === "ultimate";
    const waEnabled = !settings || settings.whatsapp_enabled !== "false";

    document.querySelectorAll(".btn-open-pdf, .btn-open-pdf-en").forEach(el => {
        el.style.display = isProOrAbove ? "" : "none";
    });
    document.querySelectorAll(".btn-whatsapp").forEach(el => {
        el.style.display = (isProOrAbove && waEnabled) ? "" : "none";
    });

    if (nav) {
        nav.querySelectorAll('a[href="/dashboard"], a[href="/reminders"]').forEach(a => {
            a.style.display = isProOrAbove ? "" : "none";
        });
    }

    const logoInput = document.getElementById("set-company-logo");
    if (logoInput) logoInput.disabled = !isUltimate;
};

document.addEventListener("DOMContentLoaded", async () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
    }
    if (window.caches) {
        caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }

    injectCustomStyles();
    I18n.addLangButton();
    I18n.translatePage();
    initSmartCustomerAutocomplete();

    try {
        const res = await fetch("/api/v1/settings?t=" + Date.now());
        if (res.ok) {
            const { settings, hasCustomLogo } = await res.json();
            window.SM_SETTINGS = settings;
            window.applyServisMasterBrandingAndTiers(settings, hasCustomLogo);
            I18n.translatePage();
        }
    } catch (e) {}

    setTimeout(() => I18n.translatePage(), 350);
    setTimeout(() => I18n.translatePage(), 1000);
    setTimeout(() => I18n.translatePage(), 2200);

    // Prevedi sve što se naknadno prikaže nakon klika (npr. + Stavka modal, SMS obrada, Bluetooth dugme)
    document.addEventListener("click", () => {
        setTimeout(() => I18n.translatePage(), 80);
        setTimeout(() => I18n.translatePage(), 450);
    });

    if (window.location.pathname === "/orders" || window.location.pathname === "/") {
        const header = document.querySelector("header");
        const logoutBtn = header && header.querySelector("#btn-logout");
        if (header && !document.getElementById("btn-quick-obd")) {
            const obdBtn = document.createElement("button");
            obdBtn.id = "btn-quick-obd";
            obdBtn.type = "button";
            obdBtn.className = "btn-secondary header-logout-btn";
            obdBtn.style.marginRight = "8px";
            obdBtn.textContent = "🔌 OBD-II";
            obdBtn.addEventListener("click", () => window.triggerObdDiagnosticModal());
            header.insertBefore(obdBtn, logoutBtn || null);
        }
    }
});

window.I18n = I18n;