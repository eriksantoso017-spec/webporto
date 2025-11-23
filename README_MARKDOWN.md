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
thumbnail: "/images/blog/thumbnail-image.jpg" # Optional: Path ke gambar thumbnail
---

Isi konten blog post Anda di sini...

Anda bisa menggunakan **Markdown** syntax:

- **Bold text**
- _Italic text_
- `Code snippets`
- [Tulisan link](https://example.com)
- Dan banyak lagi!
```

### 3. Contoh Lengkap

```markdown
---
title: "Cara Belajar Next.js untuk Pemula"
excerpt: "Panduan lengkap untuk memulai belajar Next.js dari dasar hingga mahir."
date: "April 1, 2024"
readTime: "10 min read"
thumbnail: "/images/blog/nextjs-thumbnail.jpg" # Optional: Thumbnail untuk preview
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
- **Blockquotes**: `> quote` - Lihat panduan di bawah

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

## 🖼️ Thumbnail untuk Blog Post

### 1. Menambahkan Thumbnail di Frontmatter

Tambahkan field `thumbnail` di frontmatter untuk menampilkan gambar di:

- **Blog list page** (preview card)
- **Blog post page** (di bawah title, di atas excerpt)

**Format:**

```markdown
---
title: "Judul Blog Post"
excerpt: "Deskripsi singkat"
date: "March 15, 2024"
readTime: "5 min read"
thumbnail: "/images/blog/thumbnail-image.jpg" # Path ke gambar thumbnail
---
```

### 2. Lokasi Thumbnail

Simpan thumbnail di folder `public/images/thumbnail/`:

```
public/
└── images/
    └── thumbnail/
        ├── thumbnail-1.jpg
        ├── thumbnail-2.png
        └── ...
```

### 3. Tips untuk Thumbnail

- ✅ **Ukuran disarankan**: 1200x630px (rasio 1.91:1) untuk optimal di social media
- ✅ **Format**: `.jpg`, `.png`, atau `.webp`
- ✅ **Ukuran file**: Usahakan < 200KB untuk performa
- ✅ **Naming**: Gunakan nama deskriptif (misalnya: `nextjs-tutorial-thumbnail.jpg`)
- ✅ **Optional**: Jika tidak ada thumbnail, blog post tetap akan tampil normal

### 4. Contoh Lengkap dengan Thumbnail

```markdown
---
title: "Getting Started with Next.js"
excerpt: "Panduan lengkap untuk memulai dengan Next.js"
date: "April 1, 2024"
readTime: "10 min read"
thumbnail: "/images/blog/nextjs-thumbnail.jpg"
---

# Pengenalan Next.js

Next.js adalah framework React yang powerful...
```

### 5. Gambar di Atas Paragraf Pertama

Untuk menambahkan gambar di atas paragraf pertama (di bawah title), ada 2 cara:

#### **Cara 1: Menggunakan Thumbnail (Recommended)**

Gunakan field `thumbnail` di frontmatter. Gambar akan otomatis muncul di bawah title.

#### **Cara 2: Menggunakan Markdown Image di Awal Konten**

Tambahkan gambar di awal konten markdown:

```markdown
---
title: "Judul Blog"
excerpt: "Deskripsi"
date: "March 15, 2024"
readTime: "5 min read"
---

![Gambar Hero](/images/blog/hero-image.jpg)

_Penjelasan singkat tentang gambar_

Ini adalah paragraf pertama setelah gambar...
```

**Catatan:** Jika menggunakan kedua cara, thumbnail akan muncul di bawah title, dan gambar markdown akan muncul di konten.

## 5 Cara Menggunakan Blockquote dengan Vertical Lines

Blockquote di blog Anda akan otomatis memiliki **vertical line di kiri** dengan styling yang menarik.

### 1. Syntax Dasar

Gunakan `>` di awal baris untuk membuat blockquote:

```markdown
> Ini adalah contoh blockquote dengan vertical line di kiri.
```

### 2. Multi-line Blockquote

Untuk blockquote yang lebih panjang:

```markdown
> Ini adalah blockquote dengan beberapa baris.
> Setiap baris dimulai dengan tanda `>`.
> Blockquote akan tetap memiliki vertical line di kiri.
```

### 3. Blockquote dengan Formatting

Anda bisa menggunakan formatting di dalam blockquote:

```markdown
> **Bold text** dan _italic text_ juga bisa digunakan.
>
> Bahkan bisa menggunakan `code` di dalam blockquote.
```

### 4. Contoh Lengkap

```markdown
## Pengenalan React Hooks

React Hooks adalah fitur baru di React yang memungkinkan kita menggunakan state dan fitur React lainnya tanpa menulis class.

> "Hooks memungkinkan kita untuk menggunakan state dan lifecycle methods di functional components."

Ini adalah penjelasan lanjutan tentang React Hooks...
```

### 5. Fitur Blockquote

Blockquote di blog Anda akan memiliki:

- ✅ **Vertical line purple** di kiri (4px border)
- ✅ **Background abu-abu gelap** semi-transparan
- ✅ **Indentasi yang jelas** dengan padding
- ✅ **Teks miring (italic)** untuk emphasis
- ✅ **Border radius** di kanan untuk tampilan yang lebih halus

### 6. Tips

- Gunakan blockquote untuk **quote penting**, **kutipan**, atau **highlight konten**
- Jangan terlalu banyak menggunakan blockquote (maksimal 2-3 per artikel)
- Pastikan konten di blockquote relevan dan menarik

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
