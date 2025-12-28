// src/app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "EV Vehicles — 2W & 3W",
  description: "Electric 2-wheeler and 3-wheeler vehicles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0A0A0A]">
        <Header />
        <main className="premium-page-bg site-main px-4 sm:px-6 lg:px-10 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
