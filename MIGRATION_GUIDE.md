# Panduan Migrasi dari Sheet.best ke Google Apps Script

## Langkah 1: Setup Google Spreadsheet

1. **Buat Google Spreadsheet baru** atau gunakan yang sudah ada
2. **Buat sheet dengan nama berikut:**
   - `Projects` - untuk data proyek
   - `Articles` - untuk data artikel  
   - `Skills` - untuk data skill
   - `About` - untuk data profil
   - `Contacts` - untuk menyimpan pesan kontak

3. **Struktur kolom yang diperlukan:**

### Sheet Projects:
```
Judul | Deskripsi | Gambar | Link | Teknologi
```

### Sheet Articles:
```
Judul | Deskripsi | Gambar | Link
```

### Sheet Skills:
```
Nama | Level | Icon
```

### Sheet About:
```
Tagline | Deskripsi | Foto
```

### Sheet Contacts:
```
Timestamp | Nama | Email | Pesan
```

4. **Salin ID Spreadsheet** dari URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Salin bagian `SPREADSHEET_ID`

## Langkah 2: Setup Google Apps Script

1. **Buka [Google Apps Script](https://script.google.com/)**
2. **Buat project baru**
3. **Copy-paste kode dari file `apps-script-api.js`**
4. **Ganti `YOUR_SPREADSHEET_ID_HERE`** dengan ID spreadsheet Anda
5. **Deploy sebagai Web App:**
   - Klik "Deploy" → "New deployment"
   - Pilih "Web app"
   - Set "Execute as" ke "Me"
   - Set "Who has access" ke "Anyone"
   - Klik "Deploy"
6. **Salin URL Web App** yang dihasilkan

## Langkah 3: Update Website

1. **Buka file `public/script.js`**
2. **Ganti `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`** dengan URL Web App dari langkah 2
3. **Test website** untuk memastikan semua data ter-load dengan benar

## Langkah 4: Migrasi Data (Opsional)

Jika Anda sudah punya data di Sheet.best:

1. **Export data dari Sheet.best** (jika memungkinkan)
2. **Copy-paste data ke Google Spreadsheet** sesuai struktur kolom
3. **Atau input manual** data yang diperlukan

## Testing

1. **Test semua endpoint:**
   - Projects: `YOUR_WEBAPP_URL?path=projects`
   - Articles: `YOUR_WEBAPP_URL?path=articles`
   - Skills: `YOUR_WEBAPP_URL?path=skills`
   - About: `YOUR_WEBAPP_URL?path=about`

2. **Test contact form** untuk memastikan data tersimpan ke sheet Contacts

## Keuntungan Google Apps Script

- ✅ **Gratis** untuk penggunaan dasar
- ✅ **Tidak ada limit CORS** seperti Sheet.best
- ✅ **Kontrol penuh** atas data dan API
- ✅ **Keamanan lebih baik** dengan autentikasi Google
- ✅ **Custom logic** bisa ditambahkan jika diperlukan

## Troubleshooting

### Error "Sheet tidak ditemukan"
- Pastikan nama sheet sesuai dengan yang ada di Apps Script
- Periksa permission spreadsheet

### Error CORS
- Pastikan Web App di-deploy dengan "Anyone" access
- Periksa header CORS di Apps Script

### Data tidak muncul
- Periksa struktur kolom spreadsheet
- Test endpoint langsung di browser
- Periksa console browser untuk error

## Backup

- **Simpan kode Apps Script** di file terpisah
- **Backup data spreadsheet** secara berkala
- **Test restore** untuk memastikan backup berfungsi 