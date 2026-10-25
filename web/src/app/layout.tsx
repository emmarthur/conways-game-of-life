import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conway's Game of Life",
  description:
    "Conway's Game of Life — cellular automaton with toroidal wrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
