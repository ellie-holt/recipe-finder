import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.scss";
import "../styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cabinetGrotesk = localFont({
  variable: "--font-cabinet-grotesk",
  src: [
    {
      path: "./fonts/CabinetGrotesk-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

const bespokeSerif = localFont({
  variable: "--font-bespoke-serif",
  src: [
    {
      path: "./fonts/BespokeSerif-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "./fonts/BespokeSerif-VariableItalic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "What's in Your Fridge?",
  description: "Find recipes based on the ingredients you have at home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cabinetGrotesk.variable} ${bespokeSerif.variable}`}
    >
      <body>
        {/* Header */}
        <header className={styles.header}>
          <nav>
            <Link href="/favourites">Favourites</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className={styles.main}>{children}</main>

        {/* Footer */}
        <footer className={styles.footer}>
          © {new Date().getFullYear()} Recipe Finder
        </footer>
      </body>
    </html>
  );
}
