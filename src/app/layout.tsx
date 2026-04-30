import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ronney Tech",
  description: "Base de documentação técnica dos projetos do GitHub de Marcus Rônney.",
  metadataBase: new URL("https://ronney.tech"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
