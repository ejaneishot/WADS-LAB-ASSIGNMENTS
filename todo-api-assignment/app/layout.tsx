import "swagger-ui-react/swagger-ui.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo API",
  description: "Todo API documentation",
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