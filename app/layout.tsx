import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthFlow } from "@/components/auth/AuthFlow";

export const metadata: Metadata = {
  title: "ChatX",
  description: "Connect. Chat. Share.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
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
          <ThemeProvider>
            <AuthFlow>
              <div className="mx-auto bg-black text-slate-100 flex flex-col h-screen max-w-md">
                {children}
              </div>
            </AuthFlow>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
