# 🔧 ServisMasterOS

**Kompletan operativni sistem i SaaS platforma za moderno upravljanje auto-servisima, radionicama i voznim parkovima.**

---

## ✨ Šta ServisMasterOS radi

### 🚗 Potpuna digitalizacija radionice na jednom mestu

1. **📋 Digitalni prijem vozila & Foto-dokumentacija** — brz unos vozila uz slikanje zatečenih oštećenja i stanja na licu mesta putem mobilnog telefona ili tableta.
2. **📷 Pametni OCR skener saobraćajne dozvole** — automatsko očitavanje broja šasije (VIN), registarskih tablica, marke, modela i podataka o vlasniku bez ručnog prekucavanja.
3. **🛠️ Upravljanje radnim nalozima u realnom vremenu** — praćenje statusa svake popravke (*Prijem -> Dijagnostika -> Čekanje delova -> U radu -> Spremno za preuzimanje*).
4. **📦 Magacin delova & Bar-kod / QR sistem** — precizno praćenje ulaza, izlaza, rezervacije delova po radnom nalogu i automatska upozorenja za kritične zalihe.
5. **🔍 Servisna istorija po VIN broju** — kompletan uvid u sve prethodne intervencije, zamenjene delove, preporuke mehaničara i pređenu kilometražu za svako vozilo.
6. **🔔 Automatski podsetnici za klijente** — obaveštenja putem SMS-a ili email-a za mali i veliki servis, zamenu guma i istek registracije.
7. **📱 Klijentski portal (Live Status)** — kupac dobija jedinstveni link preko kojeg prati tok popravke svog automobila i odobrava dodatne radove jednim klikom.
8. **📊 Finansije, predračuni i fakturisanje** — obračun radnih sati mehaničara, utrošenih delova, generisanje PDF predračuna i pregled profitabilnosti radionice.

### + Tehnologija i mobilnost u radionici

- **PWA (Progressive Web App)** — radi kao izvorna aplikacija na telefonima, tabletima i radioničkim računarima bez instalacije sa prodavnica.
- **Brzi rad u radionici** — interfejs prilagođen radu na dodir, sa velikim tasterima i jasnim pregledom za mehaničare i prijemno odeljenje.
- **Dvojezičnost (SR / EN)** — trenutno prebacivanje jezika celog sistema.
- **Multi-Tenant arhitektura** — potpuna izolacija podataka za svaki auto-servis uz centralnu SuperAdmin kontrolnu tablu.

---

## 💰 Cene i paketi (Mesečna pretplata)

### 🔧 Start Radionica — **29€/mesec**
* Namena: Za samostalne automehaničare i manje radionice sa 1 do 2 dizalice.
* **Šta spada u paket:**
  * Do **2 aktivna korisnika** (vlasnik + mehaničar)
  * Neograničen broj radnih naloga i vozila
  * Digitalna servisna knjiga po broju šasije (VIN)
  * Foto-dokumentacija prijema vozila (do 5 GB prostora)
  * PDF štampa i slanje radnih naloga i predračuna
  * Podrška putem email-a

### 🚀 Servis Pro — **59€/mesec** ⭐ preporučeno
* Namena: Za razvijene auto-servise koji žele potpunu kontrolu magacina i automatizaciju.
* **Šta spada u paket:**
  * Do **6 aktivnih korisnika** (prijemno odeljenje, šef radionice, mehaničari)
  * **OCR skener saobraćajne dozvole** kamerom telefona
  * **Kompletan magacin delova** sa praćenjem zaliha i dobavljača
  * Klijentski link za praćenje statusa popravke uživo
  * Automatski podsetnici klijentima za mali/veliki servis i registraciju
  * Neograničen prostor za slike i dijagnostičke izveštaje
  * Prioritetna tehnička podrška

### 🏆 Auto Centar & Flote — **119€/mesec**
* Namena: Za velike servisne centre, ovlašćene servise i firme koje održavaju vozne parkove.
* **Šta spada u paket:**
  * **Neograničen broj korisnika** i radnih mesta
  * **Sve iz Pro paketa bez ograničenja**
  * Upravljanje B2B klijentima i voznim parkovima (ugovori, zbirne fakture)
  * Detaljna analitika učinka mehaničara i profitabilnosti po nalogu
  * Dnevni automatizovani bekap baze i dokumenata
  * Prilagođeno brendiranje dokumentacije (vaš logo i zaglavlje)
  * Direktna podrška i obuka zaposlenih

---

## 🎁 Šta dobijaš sa svakim paketom

- ✅ **14 dana besplatnog testiranja** bez obaveza i unosa platne kartice
- ✅ **Trenutno pokretanje** u browseru na telefonu, tabletu ili računaru
- ✅ **Izvoz podataka (CSV / Excel)** u svakom trenutku
- ✅ **SSL enkripcija i dnevna zaštita** svih podataka o klijentima i vozilima

---

## 🛠️ Tehnologije

- **Backend:** Python + FastAPI
- **Baza podataka:** PostgreSQL + SQLAlchemy
- **Autentifikacija:** JWT & sigurne sesije
- **Frontend:** HTML5, Tailwind CSS, Vanilla JS (PWA)
- **OCR obrada:** Tesseract OCR Engine
- **Infrastruktura:** Docker, Coolify, Hetzner Cloud VPS

---

## 📞 Kontakt i autor

- **Email:** [alexalbekstudio.design@gmail.com](mailto:alexalbekstudio.design@gmail.com)
- **Studio:** ALEXANDAR Studio
- **Web:** [servis.alexandar.studio](https://servis.alexandar.studio)
- **Copyright:** © 2026 ALEXANDAR Studio. Sva prava zadržana.