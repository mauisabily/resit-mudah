# 🧾 Resit Mudah

> **Penjana Resit Percuma, Moden & 100% Privasi Terjamin (Simpanan Tempatan Sahaja)**  
> Dibina dengan **Bootstrap 5.3.x**, HTML5 & Vanilla JavaScript.  
> Demo Web: [https://mauisabily.github.io/resit-mudah](https://mauisabily.github.io/resit-mudah)

---

## 🌟 Pengenalan

**Resit Mudah** ialah sebuah aplikasi web sumber terbuka (*open-source*) yang dibina khas untuk membantu peniaga kecil, penjual dalam talian (*dropship/e-dagang*), *freelancer*, gerai pasar malam, dan usahawan mikro menjana resit jualan rasmi dan profesional dengan pantas secara **percuma**.

Kelebihan utama Resit Mudah adalah prinsip **Privasi Didahulukan (Privacy-First)**:
- ❌ **Tiada pangkalan data awan (cloud server)**.
- ❌ **Tiada pendaftaran akaun atau langganan bulanan**.
- ❌ **Tiada penjejakan (*tracking*) atau pengumpulan data pengguna**.
- ✅ **100% Data Disimpan Dalam Pelayar Anda Sendiri (`localStorage`)**.

---

## ✨ Ciri-Ciri Utama (Features)

### 1. 🛡️ 100% Privasi & Keselamatan Data (Client-Side Only)
Semua maklumat perniagaan, butiran pelanggan, dan rekod transaksi diproses dan disimpan sepenuhnya di dalam peranti pelayar (*browser*) anda. Data anda tidak pernah dihantar ke mana-mana pelayan luaran.

### 2. 🎨 Penyesuaian Logo & Tema Warna (Brand Identity)
- **Muat Naik Logo**: Pengguna boleh memuat naik logo perniagaan sendiri (disimpan dalam bentuk *Base64* di pelayar). Boleh dipadam atau diselaraskan pada bila-bila masa.
- **Pilihan Tema Warna Dinamik**: Pilih warna jenama anda daripada pilihan pratetap (*Emerald, Royal Blue, Indigo, Amber, Slate, Rose*) atau gunakan pemilih warna tersuai (*Color Picker*) untuk menyelaraskan warna aksen resit.

### 3. 📱 Reka Bentuk Responsif Moden (Bootstrap 5.3.x)
- Antara muka mesra pengguna pada telefon pintar, tablet, dan komputer riba/desktop.
- Paparan dwilajur (*Two-Column Split View*) di skrin desktop dengan pratonton resit masa nyata (*Live Sticky Preview*).
- Tab navigasi mudah pada skrin telefon pintar untuk bertukar antara borang input dan pratonton resit.

### 4. ⚡ Pratonton Langsung (Live WYSIWYG Preview)
Lihat perubahan resit secara masa nyata semasa anda memasukkan maklumat perniagaan, senarai produk/servis, harga, diskaun, dan caj penghantaran.

### 5. 📄 Pelbagai Format Templat Resit
- **Resit Rasmi Standard (A4 / A5)**: Reka bentuk kemas, berbingkai korporat, dan sesuai untuk invois atau resit formal syarikat.
- **Resit POS / Terma (Thermal Receipt 80mm)**: Format kompak jimat kertas, dioptimumkan untuk pencetak haba Bluetooth/USB.

### 6. 🖨️ Cetak & Perkongsian Pantas
- **Cetak Pelayar Dioptimumkan**: Menggunakan `@media print` untuk mencetak dokumen resit sahaja tanpa gangguan menu atau butang.
- **Kongsi ke WhatsApp**: Menjana teks ringkasan resit terformat kemas yang sedia dihantar terus ke pelanggan melalui WhatsApp.
- **Muat Turun PDF**: Sokongan mencetak terus ke format fail PDF melalui pelayar.

### 7. 🧮 Pengiraan Automatik Tepat
- Tambah atau padam baris item dengan mudah.
- Pengiraan automatik subtotal, diskaun (nilai tetap RM atau peratusan %), cukai (SST %), dan caj penghantaran/pos.
- Status pembayaran boleh dipilih: *Telah Dibayar (PAID)*, *Belum Dibayar (UNPAID)*, atau *Deposit*.

### 8. 🏢 Profil Perniagaan Tersimpan Automatik
Maklumat perniagaan seperti nama kedai, no pendaftaran SSM, alamat, no telefon, logo, dan nombor akaun bank/DuitNow disimpan secara automatik dalam `localStorage`. Anda tidak perlu menaip semula setiap kali membuka laman web ini.

### 9. 💾 Sandaran & Pulihkan (*Backup & Restore*)
- **Eksport JSON**: Simpan salinan profil perniagaan dan tetapan anda ke dalam fail `.json`.
- **Import JSON**: Pulihkan data dengan sekali klik apabila bertukar peranti atau pelayar baharu.

---

## 🛠️ Teknologi Yang Digunakan

- **Bootstrap 5.3.3**: Rangka kerja reka bentuk moden, sistem grid responsif, dan komponen UI elegan.
- **Bootstrap Icons (v1.11.3)**: Ikonografi kemas dan moden.
- **HTML5 & CSS3 (Vanilla Custom Styles)**: Pemboleh ubah CSS dinamik untuk warna tema serta penggayaan cetakan terperinci (`@media print`).
- **JavaScript (ES6+)**: Logik reaktif tanpa kebergantungan luar, pengiraan pantas, pengendalian imej Base64, dan pengurusan `localStorage`.
- **Google Fonts (Plus Jakarta Sans)**: Tipografi moden yang kemas dan profesional.
- **Pengehosan**: GitHub Pages (percuma, selamat dengan sijil SSL/HTTPS).

---

## 📂 Struktur Projek

```text
resit-mudah/
├── index.html              # Antara muka utama pengguna & pratonton resit
├── css/
│   ├── style.css           # Gaya utama UI, pemboleh ubah tema warna & reka bentuk
│   └── print.css           # Peraturan khusus pencetakan A4 & POS Terma
├── js/
│   └── app.js              # Logik storan, tema, logo, item & pengiraan matematik
├── assets/                 # Ikon dan aset grafik
├── README.md               # Dokumentasi projek
└── LICENSE                 # Lesen sumber terbuka (MIT)
```

---

## 💻 Cara Menjalankan Secara Tempatan (Local Development)

Projek ini tidak memerlukan pemasangan Node.js mahupun sebarang pelayan belakang:

1. **Klon repositori ini**:
   ```bash
   git clone https://github.com/mauisabily/resit-mudah.git
   ```
2. **Masuk ke folder projek**:
   ```bash
   cd resit-mudah
   ```
3. **Buka fail `index.html`**:
   - Klik dua kali fail `index.html` untuk dibuka terus dalam pelayar anda (Chrome, Edge, Firefox, Safari); ATAU
   - Gunakan sambungan *Live Server* di editor kod pilihan anda.

---

## 🗺️ Status & Pelan Pembangunan (Roadmap)

- [x] Reka bentuk UI/UX Responsif berasaskan Bootstrap 5.3.x.
- [x] Sistem pratonton resit masa nyata (*Live Preview*).
- [x] Pengubah suai Logo Perniagaan (*Base64 Image Upload & Storage*).
- [x] Pemilih Tema Warna Dinamik (*CSS Variables & Color Palette*).
- [x] Pengiraan automatik Subtotal, Diskaun, SST, dan Caj Pos.
- [x] Pengoptimuman Cetakan (`@media print`) untuk A4 dan POS 80mm.
- [x] Fungsi Kongsi ke WhatsApp dan Salin Teks Resit.
- [x] Sandaran & Pemulihan data melalui Eksport/Import fail JSON.
- [ ] Modul Arkib & Sejarah Resit Pelbagai Transaksi.
- [ ] PWA (Progressive Web App) dengan sokongan Service Worker luar talian.

---

## 📄 Lesen (License)

Projek ini dilesenkan di bawah [Lesen MIT](LICENSE). Bebas digunakan, diubah suai, dan diedarkan.

---

**Dicipta dengan ❤️ untuk para peniaga, usahawan mikro, dan freelancer tempatan.**  
*Maju bersama perisian terbuka, selamat, dan berteraskan privasi!*
