"use client";
import Navbar from "@/components/Navbar";
import SidebarComp from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sidebar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token: string | null = localStorage.getItem("token");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log(token);

  const router = useRouter();

  if (!token) {
    router.replace("/auth/login");
  }

  return (
    <>
      <main className="w-full h-screen flex flex-col items-center">
        <Navbar />

        <div className="mt-24 container relative">
          <Button
            className="absolute top-4 p-2"
            onClick={() => {
              setSidebarOpen((prev) => !prev);
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          {children}
        </div>
      </main>
      {sidebarOpen && (
        <SidebarComp open={sidebarOpen} openFunc={setSidebarOpen} />
      )}
    </>
  );
}
