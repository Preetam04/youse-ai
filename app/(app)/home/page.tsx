"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const session = useSession();
  console.log(session);

  return <div>Home</div>;
};

export default Home;
