import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// 2. Configure the font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Garvit Gems & Jewels",
  description: "Exclusive Jewellery Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Body mein font class add karein */}
      <body className={`${playfair.className} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}