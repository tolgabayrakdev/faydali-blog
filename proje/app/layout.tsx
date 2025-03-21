import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faydalı Blog",
  description: "Kişisel düşünceler ve yararlı bilgiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <header className="border-b border-gray-200">
          <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Faydalı Blog
            </Link>
            <nav className="space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto py-6 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Faydalı Blog. Tüm hakları saklıdır.
              </p>
              <div className="mt-4 md:mt-0">
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Gizlilik Politikası
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
