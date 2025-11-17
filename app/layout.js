import "./globals.css";
import {
  Open_Sans,
  Merriweather,
  PT_Sans,
  JetBrains_Mono,
} from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.vercel.app";

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
    "Web Development",
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
      "Hello, I'm Erik Santoso. Undergraduate Communication Student. Part time designer and video editor. Full time Unemployer. Enjoy learning new things. Passionate about technology, editing, design, cyber security, OSINT and finance.",
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
    process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.vercel.app";

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
    >
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
