# Konter App - Manajemen Konter HP (Expo 53)

Aplikasi manajemen stok & penjualan HP berbasis React Native dan Expo Go.

## Fitur Awal
- Login (basic, bisa diupgrade ke Firebase Auth)
- Dashboard
- Input Data HP
- Scan IMEI masuk & keluar (Barcode Scanner)
- Rekapitulasi harian
- Database SQLite lokal
- Backup data ke file .json
- Pipeline build APK via GitHub Actions

## Struktur Folder

```
├── assets/                # Aset gambar, ikon, splash
├── src/
│   ├── components/        # Komponen UI modular
│   ├── screens/           # Halaman aplikasi (Auth, Dashboard, Inventory, Scanner, Reports)
│   ├── navigation/        # Navigasi React Navigation
│   ├── database/          # Inisialisasi & schema SQLite
│   ├── utils/             # Helper utils (backup, restore, dll)
├── .github/workflows/     # Build pipeline EAS
```

## Build & Run

- **Development:**  
  `npm install`  
  `expo start`

- **Build APK (EAS CLI):**  
  Pastikan sudah login Expo & setup project di [Expo EAS](https://docs.expo.dev/eas/).  
  `eas build --platform android`

- **Build Otomatis via GitHub Actions:**  
  Set EAS secrets di repo > Settings > Secrets:  
  - `EXPO_TOKEN`

## Catatan

- Kompatibel dengan Expo Go (v53+)
- Modular, mudah dikembangkan (multi-user, dashboard, cloud sync, dark mode, dll)
- Database backup/restore siap ekspansi ke cloud/Firebase/Supabase
