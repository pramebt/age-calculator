import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  
  subsets: ["latin"],weight:["400","500","600"]
});



export const metadata: Metadata = {
  title: "Age calculator - BD",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
