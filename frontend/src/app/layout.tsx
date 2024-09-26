import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "NKU GAMES",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="tr">
      <body className="antialiased scroll-smooth">
        {/*  Navigasyon */}
        <Nav />

        {/* İçerik */}
        <main className="container mx-auto" style={{ minHeight: "200vh" }}>{children}</main>

        {/* Footer */}
      </body>
    </html >
  );
}
