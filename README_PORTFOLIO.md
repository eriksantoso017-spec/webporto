# Panduan Update Image Gallery Portfolio

File ini berisi panduan lengkap untuk mengupdate Image Gallery di tab **Portfolio** pada website portfolio Anda.

## 📁 Lokasi File

File data portfolio berada di:
```
data/portfolioData.js
```

## 📋 Struktur Data

Setiap project dalam image gallery harus mengikuti struktur berikut:

```javascript
{
  id: number,              // ID unik untuk setiap project (WAJIB)
  title: string,          // Judul project (WAJIB)
  description: string,     // Deskripsi singkat project (WAJIB)
  images: [string, ...],  // Array URL gambar (WAJIB, minimal 1 gambar)
}
```

## 🖼️ Menambahkan Gambar

Ada **2 cara** untuk menambahkan gambar ke portfolio:

### Cara 1: Menggunakan URL Eksternal

Gunakan URL lengkap dari website eksternal (contoh: dari Imgur, Cloudinary, atau hosting lainnya):

```javascript
images: [
  "https://example.com/images/project1.jpg",
  "https://example.com/images/project2.jpg",
]
```

### Cara 2: Menggunakan File Lokal (Public Folder)

Jika gambar disimpan di folder `public/`, gunakan path relatif dimulai dengan `/`:

```javascript
images: [
  "/images/porto/project1/hal-1.png",
  "/images/porto/project1/hal-2.png",
  "/images/porto/project1/hal-3.png",
]
```

**Struktur folder yang disarankan:**
```
public/
  └── images/
      └── porto/
          └── nama-project/
              ├── gambar-1.png
              ├── gambar-2.png
              └── gambar-3.png
```

## ✏️ Cara Menambahkan Project Baru

1. Buka file `data/portfolioData.js`

2. Tambahkan object baru di dalam array `imageProjects`:

```javascript
export const imageProjects = [
  // ... project yang sudah ada ...
  
  {
    id: 5,  // Gunakan ID yang belum digunakan
    title: "Nama Project Baru",
    description: "Deskripsi singkat tentang project ini",
    images: [
      "/images/porto/nama-project/gambar-1.png",
      "/images/porto/nama-project/gambar-2.png",
    ],
  },
];
```

## 🔄 Cara Mengedit Project yang Sudah Ada

1. Buka file `data/portfolioData.js`

2. Cari project berdasarkan `id` yang ingin diubah

3. Edit field yang diinginkan:
   - `title`: Ubah judul project
   - `description`: Ubah deskripsi project
   - `images`: Tambah/hapus/ubah URL gambar

**Contoh mengedit project:**
```javascript
{
  id: 1,
  title: "Judul Baru",  // Diubah
  description: "Deskripsi baru yang lebih lengkap",  // Diubah
  images: [
    "/images/porto/feeds-etika/hal-1.png",  // Gambar tetap
    "/images/porto/feeds-etika/hal-2.png",  // Gambar tetap
    "/images/porto/feeds-etika/hal-6.png",  // Gambar baru ditambahkan
  ],
}
```

## 🗑️ Cara Menghapus Project

1. Buka file `data/portfolioData.js`

2. Hapus seluruh object project yang ingin dihapus

**Penting:** Pastikan tidak ada koma (`,`) yang tertinggal di akhir array setelah menghapus project.

## 📐 Rekomendasi Format Gambar

Untuk hasil terbaik, disarankan:

- **Format:** PNG, JPG, atau WebP
- **Ukuran:** Disarankan 1200x800px atau rasio 3:2
- **Ukuran File:** Maksimal 1-2 MB per gambar (optimalkan jika lebih besar)
- **Kualitas:** Gunakan gambar berkualitas tinggi namun sudah dioptimalkan

## 💡 Contoh Lengkap

Berikut contoh lengkap untuk project dengan 3 gambar:

```javascript
{
  id: 6,
  title: "Website E-Commerce",
  description: "Platform e-commerce modern dengan fitur shopping cart dan payment gateway",
  images: [
    "/images/porto/ecommerce/homepage.png",
    "/images/porto/ecommerce/product-detail.png",
    "/images/porto/ecommerce/checkout.png",
  ],
}
```

## 🚀 Setelah Mengupdate

Setelah melakukan perubahan pada `portfolioData.js`:

1. **Development (Local):** 
   - Perubahan akan langsung terlihat jika development server sedang berjalan
   - Jika tidak, restart dengan: `npm run dev`

2. **Production (Deployed):**
   - Commit perubahan ke Git: 
     ```bash
     git add data/portfolioData.js
     git commit -m "Update portfolio gallery"
     git push
     ```
   - Jika menggunakan Vercel, deployment akan otomatis setelah push ke repository

## ⚠️ Catatan Penting

1. **ID Harus Unik:** Setiap project harus memiliki `id` yang berbeda
2. **Minimal 1 Gambar:** Array `images` harus memiliki minimal 1 gambar
3. **Path Case-Sensitive:** Pastikan path gambar sesuai dengan nama file di folder `public/` (case-sensitive)
4. **Eksternal URL:** Jika menggunakan URL eksternal, pastikan gambar dapat diakses publik
5. **Ukuran File:** Hindari gambar terlalu besar untuk performa website yang optimal

## 🔍 Tips & Trik

- **Urutan Gambar:** Gambar pertama dalam array akan menjadi thumbnail/default view
- **Multiple Images:** Tambahkan beberapa gambar untuk menunjukkan berbagai aspek project
- **Naming Convention:** Gunakan nama file yang deskriptif dan konsisten (misal: `hal-1.png`, `homepage.png`, dll)
- **Testing:** Selalu test di localhost sebelum deploy untuk memastikan gambar tampil dengan benar

---

**Pertanyaan?** Pastikan untuk membaca dokumentasi Next.js untuk informasi lebih lanjut tentang static assets: https://nextjs.org/docs/app/building-your-application/optimizing/static-assets

