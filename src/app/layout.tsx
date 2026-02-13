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
  icons: {
    icon: "/favicon-optimized.svg",
    apple: "/favicon-optimized.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WeekendDarshan",
  },
  formatDetection: {
    telephone: false,
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ea580c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ea580c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WeekendDarshan" />
        <meta name="application-name" content="WeekendDarshan" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" href="/favicon-optimized.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-optimized.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-optimized.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
