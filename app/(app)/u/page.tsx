"use client";

import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import getLocalToken from "@/lib/getLocalToken";
import { setUserData } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
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
    <div className="mt-20 w-full text-center text-lg  ">
      Welcome! Please open Sidebar to navigate :)
    </div>
  );
};

export default Home;
