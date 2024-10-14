import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { TransactionProvider } from "./context/TransactionContext";

export const metadata = {
  title: "Registro Staff",
  description: "Formulario",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <TransactionProvider>{children}</TransactionProvider>
      </body>
    </html>
  );
}
