import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hold Steel! — Lock the Stack",
  description: "Tactile Move-to-Front industrial steel puzzle game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0b0f14] text-[#f1f5f9] font-sans">
        {children}
      </body>
    </html>
  );
}
