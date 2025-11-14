import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Erik Santoso - Portfolio",
    template: "%s | Erik Santoso",
  },
  description:
    "Portfolio website of Erik Santoso - Undergraduate Communication Student. Showcasing projects, skills, and blog posts about web development and technology.",
  keywords: [
    "Erik Santoso",
    "Portfolio",
    "Web Developer",
    "Communication Student",
    "React",
    "Next.js",
    "Web Development",
    "Blog",
  ],
  authors: [{ name: "Erik Santoso" }],
  creator: "Erik Santoso",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Erik Santoso Portfolio",
    title: "Erik Santoso - Portfolio",
    description:
      "Portfolio website of Erik Santoso - Undergraduate Communication Student",
    images: [
      {
        url: `${baseUrl}/logo512.png`,
        width: 512,
        height: 512,
        alt: "Erik Santoso Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erik Santoso - Portfolio",
    description:
      "Portfolio website of Erik Santoso - Undergraduate Communication Student",
    images: [`${baseUrl}/logo512.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/portoweb.ico",
    shortcut: "/portoweb.ico",
    apple: "/logo192.png",
  },
  verification: {
    google: "voTjcKXM8nz1boHa-HVwu1lMaxixB8BrFYYxYPKotEo", // Kode verifikasi dari Google Search Console
  },
};

export default function RootLayout({ children }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Erik Santoso",
    jobTitle: "Undergraduate Communication Student",
    url: baseUrl,
    sameAs: [
      // Tambahkan link social media Anda di sini jika ada
      // "https://github.com/yourusername",
      // "https://linkedin.com/in/yourusername",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
