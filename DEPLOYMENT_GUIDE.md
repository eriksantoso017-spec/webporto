# 📝 Panduan Update Content Setelah Deploy ke Vercel

Setelah website Anda di-deploy ke Vercel, berikut adalah cara untuk update konten blog dan portfolio.

## 🚀 Cara Update Content

### Metode 1: Git Workflow (Recommended)

Ini adalah cara yang paling mudah dan terorganisir untuk update konten.

#### **Step 1: Clone Repository (jika belum)**

```bash
git clone <repository-url>
cd portoweb
```

#### **Step 2: Update Content**

**Untuk Blog:**
- Edit file markdown di `content/blog/`
- Contoh: `content/blog/getting-started-with-react-hooks.md`

**Untuk Portfolio:**
- Edit file `data/portfolioData.js`
- Ubah data imageProjects sesuai kebutuhan

#### **Step 3: Commit & Push**

```bash
# Tambahkan file yang diubah
git add .

# Commit perubahan
git commit -m "Update blog post: Getting Started with React Hooks"

# Push ke repository
git push origin main
```

#### **Step 4: Vercel Auto-Deploy**

Vercel akan otomatis:
- ✅ Detect perubahan di repository
- ✅ Build ulang website
- ✅ Deploy update ke production
- ⏱️ Biasanya selesai dalam 2-5 menit

### Metode 2: Vercel Dashboard (Tidak Recommended untuk Content)

Anda bisa edit file langsung di Vercel Dashboard, tapi **tidak praktis** untuk update rutin:

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda
3. Klik tab "Source"
4. Edit file secara online
5. Vercel akan auto-deploy

⚠️ **Catatan:** Metode ini tidak disarankan karena:
- Tidak ada version control yang baik
- Sulit untuk track perubahan
- Tidak bisa rollback dengan mudah

## 📍 Path File untuk Update Content

### **Blog Posts**

```
📁 content/blog/
├── getting-started-with-react-hooks.md
├── javascript-tips-every-developer-should-know.md
├── building-responsive-web-apps-with-css-grid.md
└── optimizing-react-performance.md
```

**File yang perlu di-update:**
- `content/blog/[nama-file].md` - Edit konten blog post
- `public/images/blog/[nama-gambar].jpg` - Upload gambar baru untuk blog

### **Portfolio Gallery**

```
📁 data/
└── portfolioData.js
```

**File yang perlu di-update:**
- `data/portfolioData.js` - Edit data imageProjects array
- `public/images/[folder]/` - Upload gambar project baru

## 📋 Workflow Update Blog Post

### Contoh: Menambah Blog Post Baru

1. **Buat file markdown baru:**
   ```bash
   # Di local computer
   touch content/blog/panduan-nextjs.md
   ```

2. **Tulis konten:**
   ```markdown
   ---
   title: "Panduan Lengkap Next.js"
   excerpt: "Belajar Next.js dari dasar hingga mahir"
   date: "November 1, 2024"
   readTime: "15 min read"
   ---
   
   # Pengenalan Next.js
   
   Konten blog post Anda...
   ```

3. **Upload gambar (jika ada):**
   - Simpan di `public/images/blog/panduan-nextjs-cover.png`

4. **Commit & Push:**
   ```bash
   git add content/blog/panduan-nextjs.md public/images/blog/
   git commit -m "Add new blog post: Panduan Next.js"
   git push origin main
   ```

5. **Tunggu Vercel deploy** (2-5 menit)

6. **Cek website** - Post baru akan muncul otomatis!

## 📋 Workflow Update Portfolio

### Contoh: Menambah Project Baru

1. **Upload gambar project:**
   - Simpan di `public/images/portfolio/project-name-1.jpg`
   - Simpan di `public/images/portfolio/project-name-2.jpg`

2. **Edit `data/portfolioData.js`:**
   ```javascript
   export const imageProjects = [
     // ... existing projects
     {
       id: 5,
       title: "Project Baru Saya",
       description: "Deskripsi project baru",
       images: [
         "/images/portfolio/project-name-1.jpg",
         "/images/portfolio/project-name-2.jpg",
       ],
     },
   ];
   ```

3. **Commit & Push:**
   ```bash
   git add data/portfolioData.js public/images/portfolio/
   git commit -m "Add new portfolio project"
   git push origin main
   ```

4. **Tunggu Vercel deploy** - Project baru akan muncul!

## 🎯 Best Practices

### ✅ DO's (Lakukan)

1. **Always commit dengan message yang jelas:**
   ```bash
   git commit -m "Update blog: Add React Hooks tutorial"
   git commit -m "Add portfolio: E-commerce project"
   ```

2. **Test di local dulu sebelum push:**
   ```bash
   npm run dev
   # Test di http://localhost:3000
   ```

3. **Gunakan branch untuk update besar:**
   ```bash
   git checkout -b update-blog-posts
   # Make changes
   git push origin update-blog-posts
   # Create PR di GitHub, lalu merge
   ```

4. **Optimize gambar sebelum upload:**
   - Resize gambar (max 1920px width)
   - Compress (gunakan tools seperti TinyPNG)
   - Gunakan format WebP jika memungkinkan

### ❌ DON'Ts (Jangan Lakukan)

1. ❌ **Jangan push langsung ke production tanpa test**
2. ❌ **Jangan commit file gambar yang terlalu besar** (>1MB)
3. ❌ **Jangan hardcode URL localhost di markdown**
4. ❌ **Jangan skip commit message**

## 🔄 Update Rutin: Quick Reference

### Update Blog Post Existing

```bash
# 1. Edit file markdown
vim content/blog/nama-post.md

# 2. Commit & Push
git add content/blog/
git commit -m "Update blog post: nama post"
git push origin main
```

### Tambah Blog Post Baru

```bash
# 1. Buat file baru
touch content/blog/post-baru.md

# 2. Tulis konten (dengan frontmatter)

# 3. Commit & Push
git add content/blog/post-baru.md
git commit -m "Add new blog post: Post Baru"
git push origin main
```

### Update Portfolio

```bash
# 1. Edit portfolioData.js
vim data/portfolioData.js

# 2. Upload gambar (jika ada)
# Simpan di public/images/portfolio/

# 3. Commit & Push
git add data/portfolioData.js public/images/portfolio/
git commit -m "Update portfolio: Add new project"
git push origin main
```

## 🐛 Troubleshooting

### Problem: Update tidak muncul di website

**Solution:**
1. Cek Vercel deployment status di dashboard
2. Pastikan build berhasil (no errors)
3. Hard refresh browser (Ctrl+Shift+R)
4. Clear cache browser

### Problem: Gambar tidak muncul

**Solution:**
1. Pastikan path benar: `/images/blog/filename.jpg` (dengan slash di depan)
2. Pastikan file ada di `public/images/blog/`
3. Pastikan file sudah di-commit dan di-push
4. Cek nama file (case-sensitive)

### Problem: Build error di Vercel

**Solution:**
1. Test di local dulu: `npm run build`
2. Cek error log di Vercel dashboard
3. Pastikan semua dependencies terinstall
4. Pastikan file markdown format benar (frontmatter)

## 📊 Monitoring Deployments

Anda bisa monitor deployment di:
- **Vercel Dashboard** → Project → Deployments
- **GitHub Actions** (jika menggunakan GitHub)

**Status deployment:**
- 🟢 Ready = Deploy berhasil
- 🟡 Building = Sedang build
- 🔴 Error = Ada error, cek logs

## 🎉 Quick Tips

1. **Fast updates:** Gunakan `git push` untuk trigger auto-deploy
2. **Version control:** Semua perubahan ter-track di Git
3. **Rollback:** Bisa rollback ke commit sebelumnya via Vercel dashboard
4. **Preview:** Vercel otomatis membuat preview untuk setiap branch

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Git Workflow](https://guides.github.com/introduction/flow/)
- [Markdown Guide](./README_MARKDOWN.md)

---

**Happy Updating! 🚀**

