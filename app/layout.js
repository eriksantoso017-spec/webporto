import "./globals.css";

export const metadata = {
  title: "Erik Santoso - Portfolio",
  description:
    "Portfolio website of Erik Santoso - Undergraduate Communication Student",
  icons: {
    icon: "/portoweb.ico",
    shortcut: "/portoweb.ico",
    apple: "/logo192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
