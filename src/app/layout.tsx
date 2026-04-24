import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import Header from "@/components/ui/Header";
import BottomNav from "@/components/ui/BottomNav";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orgaa Food | Premium Natural Solutions",
  description: "World-Class D2C Health Tech for Gastric, Weight, and Skin Care.",
  other: {
    'google': 'notranslate',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} translate="no">
      <body className="min-h-full bg-[#F2F2F7] flex flex-col font-sans">
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
