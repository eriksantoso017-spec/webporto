import "./globals.css";
import {
  Open_Sans,
  Merriweather,
  PT_Sans,
  JetBrains_Mono,
} from "next/font/google";

// Optimized font loading - reduced weights to minimize CSS size
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Reduced from 6 to 3 weights
  variable: "--font-open-sans",
  display: "swap",
  preload: true, // Preload font for faster rendering
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Reduced from 4 to 2 weights
  variable: "--font-merriweather",
  display: "swap",
  preload: false, // Not critical, don't preload
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Keep only used weights
  style: ["normal", "italic"], // Keep italic for blog content
  variable: "--font-pt-sans",
  display: "swap",
  preload: false, // Not critical, don't preload
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"], // Reduced from 8 to 2 weights (only used weights)
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false, // Not critical, don't preload
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.com";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Erik Santoso - Portfolio",
    template: "%s | Erik Santoso",
  },
  description:
    "Hello, I'm Erik Santoso. Undergraduate Communication Student. Part time designer and video editor. Full time Unemployer. Enjoy learning new things. Passionate about technology, editing, design, cyber security, OSINT and finance.",
  keywords: [
    "Erik Santoso",
    "Portfolio",
    "Communication Student",
    "Designer",
    "Video Editor",
    "Technology",
    "Cyber Security",
    "OSINT",
    "Finance",
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
      "Hello, I'm Erik Santoso. Undergraduate Communication Student. Part time designer and video editor. Full time Unemployer. Enjoy learning new things. Passionate about technology, editing, design, cyber security, OSINT and finance.",
    images: [
      {
        url: `${baseUrl}/logo-erik-512.png`,
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
      "Hello, I'm Erik Santoso. Undergraduate Communication Student. Part time designer and video editor. Full time Unemployer. Enjoy learning new things. Passionate about technology, editing, design, cyber security, OSINT and finance.",
    images: [`${baseUrl}/logo-erik-512.png`],
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
    apple: "/logo-erik-192.png",
  },
  verification: {
    google: "voTjcKXM8nz1boHa-HVwu1lMaxixB8BrFYYxYPKotEo", // Kode verifikasi dari Google Search Console
  },
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Erik Santoso",
    jobTitle: "Undergraduate Communication Student",
    url: baseUrl,
    sameAs: [],
  };

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${merriweather.variable} ${ptSans.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <head>
        {/* Theme color for mobile browser navbar - dark mode */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
