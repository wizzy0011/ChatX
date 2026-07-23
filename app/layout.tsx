import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "ChatX",
  description: "Premium mobile messaging application",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AuthProvider>
          <div className="mx-auto bg-black text-slate-100 flex flex-col h-screen max-w-md">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
