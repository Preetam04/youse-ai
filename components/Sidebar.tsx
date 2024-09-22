"use client";

import { ChevronLeft, EllipsisVertical, Kanban, List, X } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import apiClient from "@/lib/apiClient";
import { setUserData } from "@/store/slices/userSlice";

const SidebarComp = ({ open, openFunc }) => {
  const sidebarData = [
    {
      id: 1,
      title: "Kanban",
      link: "/kanban",
      Icon: <Kanban />,
    },
    {
      id: 2,
      title: "List",
      link: "/list",
      Icon: <List />,
    },
  ];

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  async function getMyData() {
    try {
      const res = await apiClient.get("/api/me");
      // console.log(res);

      const userData = {
        username: res.data.user.username,
        email: res.data.user.email,
      };

      dispatch(setUserData(userData));
    } catch (error) {
      console.log(error.response.status);
    }
  }

  useEffect(() => {
    if (!user.username || !user.email) {
      getMyData();
    }
  }, []);

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen z-30 bg-white dark:bg-zinc-900 flex flex-col pt-10 px-4 pb-5">
      <Button
        className="absolute right-4  p-2"
        variant={"secondary"}
        onClick={() => {
          openFunc((prev) => !prev);
        }}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <h1 className="font-bold text-2xl ">Youse AI</h1>

      <div className="w-full relative h-full mt-8">
        <ul>
          {sidebarData.map((ele) => (
            <Link
              key={ele.id}
              href={`/u/${ele.link}`}
              onClick={() => {
                openFunc((prev) => !prev);
              }}
            >
              <li className="flex gap-3 items-center text-lg hover:bg-black/20 px-3.5 py-2 rounded-md opacity-80 hover:opacity-100 cursor-pointer">
                {ele.Icon}
                {ele.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* <Button variant={"secondary"} className="w-full absolute bottom-0">
          Logout
        </Button> */}

        <div className="w-full absolute bottom-0 bg-black/10 dark:bg-black/25 flex justify-between p-4 rounded-md">
          <div className="flex gap-3 items-center">
            {/* <div className=" w-4 h-4 rounded-md text bg-white ">P</div> */}
            <Button className="cursor-default">
              {user.username[0]?.toUpperCase()}
            </Button>
            <div className="leading-4">
              <h4 className="font-semibold">
                {user.username?.slice(0, 1).toUpperCase() +
                  user.username?.slice(1, user.username.length)}
              </h4>
              <span className="text-xs text-gray">{user.email}</span>
            </div>
            <EllipsisVertical className="absolute right-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarComp;
