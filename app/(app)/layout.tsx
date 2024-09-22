"use client";
import Navbar from "@/components/Navbar";
import SidebarComp from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sidebar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import getLocalToken from "@/lib/getLocalToken";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token: string | null = getLocalToken();

  const router = useRouter();

  if (!token) {
    router.replace("/auth/login");
  }

  return (
    <>
      <main className="w-full h-screen flex flex-col items-center">
        <Navbar />

        <div className="mt-24 container relative sm:px-0 px-5 h-screen">
          <Button
            className="block p-2 mt-4"
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
