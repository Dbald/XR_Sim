import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XR Sim — Financial Decision Simulator",
  description:
    "Financial literacy is not a reading problem. It's a simulation problem. Make decisions with real consequences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
