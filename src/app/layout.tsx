import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ripple — A Pilot for Cardtonic's Pil API",
  description:
    "A working solo pilot simulating Cardtonic's upcoming Pil API — built by one Upskill applicant, honestly labeled, not an official Cardtonic product.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#002444]">
        {children}
      </body>
    </html>
  );
}
