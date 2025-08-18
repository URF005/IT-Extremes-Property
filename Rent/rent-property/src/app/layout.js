import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContacts from "./components/FloatingContacts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rents Inn",
  description: "Find your ideal rental home in Islamabad's prime sectors B-17 and D-17. Browse apartments, houses, and commercial properties with modern amenities at competitive prices.",
  other: {
    'google-site-verification': 'BxYNxckU2p_Qt2lrdnQr3KboFatYH4C7sp7TQS9kOYk',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FloatingContacts />
      </body>
    </html>
  );
}
