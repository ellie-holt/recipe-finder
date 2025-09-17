import type { Metadata } from "next";
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
    <html lang="en">
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
          © {new Date().getFullYear()} Ellie's Recipes
        </footer>
      </body>
    </html>
  );
}
