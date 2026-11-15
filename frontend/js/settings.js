document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("sm-settings-form");
    const obdResult = document.getElementById("obd-test-result");
    const langSwitcher = document.getElementById("sm-lang-switcher");

    if (langSwitcher && window.I18n) {
        langSwitcher.value = I18n.currentLang;
        langSwitcher.addEventListener("change", (e) => {
            I18n.setLang(e.target.value);
        });
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
            setVal("set-company-address", settings.company_address || "");
            setVal("set-company-phone", settings.company_phone || "");
            setVal("set-company-bank", settings.company_bank_acc || "");
            setVal("set-currency", settings.currency_base || "RSD");
            setVal("set-license-key", settings.license_key || "");
            setVal("set-obd-mode", settings.obd_mode || "simulation");
            setVal("set-obd-port", settings.obd_com_port || "COM3");
            setVal("set-obd-baud", settings.obd_baudrate || "38400");
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
                badge.style.background = tier === "ULTIMATE" ? "#4f46e5" : (tier === "PRO" ? "#059669" : "#475569");
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
                    alert(`Podešavanja sačuvana! Aktivan paket: ${(data.license_tier || "core").toUpperCase()}`);
                } else {
                    alert("Greška: " + (data.detail || "Neuspešno čuvanje."));
                }
            } catch (err) {
                alert("Mrežna greška pri čuvanju podešavanja.");
            }
        });
    }

    document.getElementById("btn-remove-logo")?.addEventListener("click", async () => {
        const fd = new FormData();
        fd.append("remove_logo", "true");
        const res = await fetch("/api/v1/settings", { method: "POST", body: fd });
        if (res.ok) await loadSettingsForm();
    });

    // Test OBD-II (Backend Serial COM ili Simulacija)
    document.getElementById("btn-test-obd")?.addEventListener("click", async () => {
        obdResult.innerHTML = "⏳ Povezivanje sa OBD-II interfejsom...";
        try {
            const res = await fetch("/api/v1/settings/obd/scan");
            const data = await res.json();
            if (!res.ok) {
                obdResult.innerHTML = `<span style="color:#ef4444; font-weight:700;">❌ ${data.detail || "Greška pri povezivanju"}</span>`;
                return;
            }
            const list = (data.dtc || []).map(d => `<li><strong>${d.code}</strong>: ${d.description}</li>`).join("");
            obdResult.innerHTML = `<div style="background:#f8fafc; border:1px solid #cbd5e1; padding:10px; border-radius:8px;">
                <strong>✅ Režim: ${data.mode.toUpperCase()} (${data.port})</strong>
                <ul style="margin:6px 0 0 18px;">${list || "<li>Nema zabeleženih grešaka (0 DTC).</li>"}</ul>
            </div>`;
        } catch (err) {
            obdResult.innerHTML = `<span style="color:#ef4444;">❌ Greška u komunikaciji sa serverom.</span>`;
        }
    });

    // Web Bluetooth uparivanje za ELM327 BLE uređaje direktno iz Chrome/Edge pretraživača
    document.getElementById("btn-web-bt")?.addEventListener("click", async () => {
        if (!navigator.bluetooth) {
            obdResult.innerHTML = `<span style="color:#ef4444; font-weight:700;">❌ Vaš pretraživač ne podržava Web Bluetooth (koristite Chrome ili Edge na računaru/Androidu).</span>`;
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