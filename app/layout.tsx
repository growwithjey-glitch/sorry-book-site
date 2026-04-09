import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Story Isn't Over",
  description: "A romantic and funny apology storybook for Taran from Jey.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
