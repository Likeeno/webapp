import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "لایکینو - فروش فالوور، لایک و بازدید",
  description: "فروش فالوور، لایک و بازدید برای اینستاگرام، تیک تاک، یوتیوب و توییتر",
  keywords: "فالوور, لایک, بازدید, اینستاگرام, تیک تاک, یوتیوب, توییتر, لایکینو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased bg-primary-background text-primary-text font-regular">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
