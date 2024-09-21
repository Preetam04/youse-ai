"use client";
import { DarkModeBtn } from "./DarkModeBtn";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-center sticky">
      <div className="container flex items-center justify-between ">
        <h1 className="font-bold text-3xl ">Youse AI</h1>

        <DarkModeBtn />
      </div>
      <Separator className="absolute bottom-0" />
    </nav>
  );
};

export default Navbar;
