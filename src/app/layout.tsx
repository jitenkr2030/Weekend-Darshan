import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeekendDarshan - Weekend Travel & Temple Darshan Booking",
  description: "Book comfortable weekend trips to Khatu Shyam, Salasar Balaji and more. AC buses, darshan assistance, and transparent pricing.",
  keywords: ["WeekendDarshan", "temple darshan", "weekend trips", "Khatu Shyam", "Salasar Balaji", "bus travel", "religious tourism"],
  authors: [{ name: "WeekendDarshan Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "WeekendDarshan - Your Spiritual Journey, Simplified",
    description: "Book comfortable weekend trips to temples with AC buses and darshan assistance",
    url: "https://weekenddarshan.com",
    siteName: "WeekendDarshan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeekendDarshan",
    description: "Book comfortable weekend trips to temples with AC buses and darshan assistance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
