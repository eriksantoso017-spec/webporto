# Portfolio Website - Next.js

Portfolio website built with Next.js, React, and Tailwind CSS.

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser manually** (Next.js tidak auto-open browser)

### Troubleshooting

Jika dev server stuck atau tidak merespons:

1. **Clear Next.js cache:**
```bash
rm -rf .next
# Atau di Windows PowerShell:
Remove-Item -Recurse -Force .next
```

2. **Restart dev server:**
```bash
# Stop dengan Ctrl+C
npm run dev
```

3. **Gunakan port berbeda:**
```bash
npm run dev -- -p 3001
```

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure the build
6. Click "Deploy"

That's it! Your site will be live.

## Project Structure

```
├── app/
│   ├── layout.js       # Root layout
│   ├── page.js         # Home page
│   └── globals.css     # Global styles with animations
├── components/
│   ├── Portfolio2x3.jsx    # Main portfolio component
│   └── ui/
│       └── Components.jsx   # UI components (Button, Tabs, etc.)
├── data/
│   └── blogData.js     # Blog posts data
└── public/             # Static assets (icons, PDFs, etc.)
```

## Next Steps for CMS Integration

Untuk integrasi CMS, Anda bisa menggunakan:

### Option 1: Sanity CMS
1. Install: `npm install @sanity/client @sanity/image-url`
2. Setup Sanity project
3. Create API routes untuk fetch data

### Option 2: Contentful
1. Install: `npm install contentful`
2. Setup Contentful space
3. Fetch data di `getStaticProps` atau API routes

### Option 3: Markdown Files (MDX)
1. Install: `npm install next-mdx-remote gray-matter`
2. Create `posts/` directory
3. Use file-based routing untuk blog posts

## Features

- ✅ Portfolio showcase
- ✅ Skills section
- ✅ Education & Experience
- ✅ Contact links
- ✅ Blog section (siap untuk CMS integration)
- ✅ Animations & effects
- ✅ Responsive design
- ✅ SEO ready (Next.js)
