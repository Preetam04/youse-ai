"use client";
import { DarkModeBtn } from "./DarkModeBtn";
import { Separator } from "./ui/separator";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-center fixed px-5 sm:px-0 bg-white dark:bg-[#0a0a0a] z-20">
      <div className="container flex items-center justify-between ">
        <h1 className="font-bold text-3xl ">Youse AI</h1>
        <div className="flex gap-4 justify-between items-center">
          <DarkModeBtn />
        </div>
      </div>
      <Separator className="absolute bottom-0" />
    </nav>
  );
};

export default Navbar;
