"use client";
import { DarkModeBtn } from "@/components/DarkModeBtn";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token: string | null = localStorage.getItem("token");

  const router = useRouter();

  if (token) {
    router.replace("/u");
    return;
  }

  return (
    <main className="w-full h-screen">
      <div className="absolute right-5 top-5 sm:right-10 sm:top-10">
        <DarkModeBtn />
      </div>
      {children}
    </main>
  );
}
