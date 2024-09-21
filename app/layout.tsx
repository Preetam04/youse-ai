import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/context/AuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
