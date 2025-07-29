import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Réflexologie Plantaire - Tom Robert",
  description: "Réflexologie plantaire à Paris. Séances de 1h à 80€. Cabinet Anima et Studio KAH. Prise de rendez-vous en ligne.",
  icons: {
    icon: '/logo-reflexologie-2025-lighter.jpg',
    apple: '/logo-reflexologie-2025-lighter.jpg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Réflexologie Plantaire',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
