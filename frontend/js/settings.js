document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("sm-settings-form");
    const obdResult = document.getElementById("obd-test-result");
    const btnLogout = document.getElementById("btn-logout");

    if (btnLogout && window.ApiService) {
        btnLogout.addEventListener("click", () => ApiService.logout());
    }

    async function loadSettingsForm() {
        try {
            const res = await fetch("/api/v1/settings?t=" + Date.now());
            if (!res.ok) return;
            const { settings, hasCustomLogo } = await res.json();

            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el && val != null) el.value = val;
            };

            setVal("set-company-name", settings.company_name || "ServisMaster OS");
            setVal("set-company-pib", settings.company_pib || "");
            setVal("set-company-mb", settings.company_mb || "");
            setVal("set-company-address", settings.company_address || "");
            setVal("set-company-city", settings.company_city || "");
            setVal("set-company-phone", settings.company_phone || "");
            setVal("set-company-bank", settings.company_bank_acc || "");
            setVal("set-currency", settings.currency_base || "RSD");
            setVal("set-license-key", settings.license_key || "");
            setVal("set-obd-mode", settings.obd_mode || "simulation");
            setVal("set-obd-port", settings.obd_com_port || "COM3");
            setVal("set-obd-baud", settings.obd_baudrate || "38400");
            setVal("set-wa-enabled", settings.whatsapp_enabled || "true");
            setVal("set-wa-phone", settings.whatsapp_phone || "");
            setVal("set-wa-greeting", settings.whatsapp_greeting || "Poštovani, status vašeg vozila možete pratiti na linku:");
            setVal("set-tg-enabled", settings.telegram_enabled || "false");
            setVal("set-tg-token", settings.telegram_bot_token || "");
            setVal("set-tg-chat", settings.telegram_chat_id || "");
            setVal("set-fiscal-mode", settings.fiscal_mode || "internal");
            setVal("set-fiscal-url", settings.fiscal_pfr_url || "http://localhost:8989/api/v3/invoices");
            setVal("set-fiscal-pac", settings.fiscal_pac || "");
            setVal("set-fiscal-cashier", settings.fiscal_cashier || "Serviser 1");
            setVal("set-smtp-host", settings.smtp_host || "smtp.gmail.com");
            setVal("set-smtp-port", settings.smtp_port || "587");
            setVal("set-smtp-user", settings.smtp_user || "");
            setVal("set-smtp-pass", settings.smtp_pass || "");

            const tier = (settings.license_tier || "core").toUpperCase();
            const badge = document.getElementById("settings-tier-badge");
            if (badge) {
                badge.textContent = `${tier} EDITION`;
                badge.style.background = tier === "ULTIMATE" ? "#d97706" : (tier === "PRO" ? "#059669" : "#475569");
                badge.style.color = "#fff";
            }

            if (window.applyServisMasterBrandingAndTiers) {
                window.applyServisMasterBrandingAndTiers(settings, hasCustomLogo);
            }
        } catch (err) {
            console.error("Greška pri učitavanju podešavanja:", err);
        }
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            try {
                const res = await fetch("/api/v1/settings", { method: "POST", body: fd });
                const data = await res.json();
                if (res.ok) {
                    await loadSettingsForm();
                    if (window.showObdModal) {
                        window.showObdModal(
                            I18n.currentLang === "en" ? "✅ Settings Saved" : "✅ Podešavanja sačuvana",
                            `<p style="margin:0; font-size:0.95rem;">${I18n.currentLang === "en" ? "Active license tier:" : "Aktivni licencni paket:"} <strong>${(data.license_tier || "core").toUpperCase()} EDITION</strong></p>`
                        );
                    }
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    document.getElementById("btn-remove-logo")?.addEventListener("click", async () => {
        const fd = new FormData();
        fd.append("remove_logo", "true");
        const res = await fetch("/api/v1/settings", { method: "POST", body: fd });
        if (res.ok) await loadSettingsForm();
    });

    document.getElementById("btn-test-obd")?.addEventListener("click", async () => {
        if (window.triggerObdDiagnosticModal) {
            window.triggerObdDiagnosticModal();
        }
    });

    document.getElementById("btn-web-bt")?.addEventListener("click", async () => {
        if (!navigator.bluetooth) {
            obdResult.innerHTML = `<span style="color:#ef4444; font-weight:700;">❌ Vaš pretraživač ne podržava Web Bluetooth (koristite Chrome ili Edge).</span>`;
            return;
        }
        try {
            obdResult.innerHTML = "📶 Tražim ELM327 / OBD-II Bluetooth uređaje u blizini...";
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ["0000fff0-0000-1000-8000-00805f9b34fb", "0000ffe0-0000-1000-8000-00805f9b34fb"]
            });
            obdResult.innerHTML = `<span style="color:#10b981; font-weight:700;">✅ Povezan Bluetooth uređaj: ${device.name || device.id}</span>`;
        } catch (err) {
            obdResult.innerHTML = `<span style="color:#64748b;">ℹ️ Bluetooth uparivanje otkazano ili uređaj nije pronađen.</span>`;
        }
    });

    await loadSettingsForm();
});