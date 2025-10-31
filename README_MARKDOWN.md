# Markdown Blog Setup Guide

Blog website Anda sekarang menggunakan **Markdown + gray-matter** untuk mengelola konten blog.

## 📁 Struktur File

```
portoweb/
├── content/
│   └── blog/
│       ├── getting-started-with-react-hooks.md
│       ├── javascript-tips-every-developer-should-know.md
│       ├── building-responsive-web-apps-with-css-grid.md
│       └── optimizing-react-performance.md
├── lib/
│   └── markdown.js (utility untuk membaca markdown files)
└── app/
    └── api/
        └── blog/
            └── route.js (API endpoint untuk blog posts)
```

## ✍️ Cara Menambah Blog Post Baru

### 1. Buat File Markdown Baru

Buat file baru di folder `content/blog/` dengan format:

- Nama file: `slug-blog-post-anda.md` (gunakan lowercase dan dash sebagai pemisah)
- Contoh: `cara-belajar-nextjs.md`

### 2. Format Frontmatter

Setiap file markdown harus memiliki **frontmatter** di bagian atas:

```markdown
---
title: "Judul Blog Post Anda"
excerpt: "Ringkasan singkat tentang artikel ini (akan muncul di preview card)"
date: "March 15, 2024"
readTime: "5 min read"
---

Isi konten blog post Anda di sini...

Anda bisa menggunakan **Markdown** syntax:

- **Bold text**
- _Italic text_
- `Code snippets`
- [Links](https://example.com)
- Dan banyak lagi!
```

### 3. Contoh Lengkap

```markdown
---
title: "Cara Belajar Next.js untuk Pemula"
excerpt: "Panduan lengkap untuk memulai belajar Next.js dari dasar hingga mahir."
date: "April 1, 2024"
readTime: "10 min read"
---

# Pengenalan Next.js

Next.js adalah framework React yang sangat powerful untuk membangun web applications.

## Keuntungan Next.js

- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **API Routes**
- Dan banyak lagi...

### Memulai Proyek

Untuk memulai proyek Next.js baru, jalankan:

\`\`\`bash
npx create-next-app@latest
\`\`\`

Selamat belajar! 🚀
```

## 🎨 Format Markdown yang Didukung

Anda bisa menggunakan semua syntax Markdown standar:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code**: `` `code` ``
- **Code blocks**: ` ```language ``` `
- **Links**: `[text](url)`
- **Images**: `![alt](url)` - Lihat panduan di bawah
- **Lists**: `- item` atau `1. item`
- **Blockquotes**: `> quote`

## 🖼️ Cara Menambahkan Gambar di Markdown

### 1. Simpan Gambar di Folder `public/`

Simpan gambar Anda di folder `public/images/blog/` untuk gambar blog posts.

**Struktur folder:**

```
public/
└── images/
    └── blog/
        ├── react-hooks-demo.png
        ├── javascript-tips.png
        └── ...
```

### 2. Syntax Markdown untuk Gambar

**Format dasar:**

```markdown
![Alt text untuk gambar](/images/blog/nama-gambar.jpg)
```

**Dengan caption (optional):**

```markdown
![Alt text](/images/blog/demo.png)

_Caption untuk gambar ini_
```

**Contoh lengkap:**

```markdown
## Pengenalan React Hooks

![React Hooks Example](/images/blog/react-hooks-demo.png)

_Contoh penggunaan useState dalam React Hooks_

Ini adalah penjelasan lanjutan tentang React Hooks...
```

### 3. Tips untuk Gambar

- ✅ **Path relatif dari root**: Gunakan `/images/blog/...` (dengan slash di depan)
- ✅ **Format yang didukung**: `.jpg`, `.png`, `.gif`, `.webp`, `.svg`
- ✅ **Naming**: Gunakan nama file yang deskriptif (misalnya: `react-hooks-demo.png`)
- ✅ **Alt text**: Selalu tambahkan alt text untuk accessibility
- ✅ **Optimasi**: Gunakan gambar yang di-optimize untuk web (ukuran kecil, format modern)

### 4. Menggunakan URL Eksternal

Anda juga bisa menggunakan URL gambar eksternal:

```markdown
![External Image](https://example.com/image.jpg)
```

**Catatan:** Untuk production, lebih baik simpan gambar di `public/` folder untuk performance yang lebih baik.

## 📝 Tips

1. **Gunakan slug yang deskriptif** untuk nama file (mudah dibaca dan SEO-friendly)
2. **Date format**: Gunakan format seperti "March 15, 2024" untuk konsistensi
3. **Read time**: Estimasi waktu baca, contoh "5 min read", "10 min read"
4. **Excerpt**: Buat ringkasan yang menarik (1-2 kalimat) untuk menarik pembaca

## 🔄 Refresh Blog

Setelah menambah atau mengubah file markdown:

- File akan otomatis terdeteksi oleh Next.js
- Refresh browser untuk melihat perubahan
- Tidak perlu restart server (hot reload)

## 🚀 Best Practices

1. **Organize**: Simpan semua blog posts di `content/blog/`
2. **Naming**: Gunakan format `kebab-case` untuk nama file
3. **Frontmatter**: Selalu isi semua field di frontmatter
4. **Content**: Tulis konten yang menarik dan informatif
5. **Version Control**: Commit markdown files ke Git untuk backup

## 🐛 Troubleshooting

- **Post tidak muncul?** Pastikan file ada di `content/blog/` dengan ekstensi `.md`
- **Format error?** Pastikan frontmatter menggunakan format YAML yang benar
- **Content tidak ter-render?** Cek console browser untuk error

## 📚 Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [gray-matter Documentation](https://github.com/jonschlinkert/gray-matter)
- [React Markdown](https://github.com/remarkjs/react-markdown)

Happy writing! ✨
