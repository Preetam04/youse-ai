import axios from "axios";
import { getSession } from "next-auth/react"; // Client-side session fetching
import { getToken } from "next-auth/jwt"; // Server-side session token fetching
import getLocalToken from "./getLocalToken";

const apiClient = axios.create();

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    let token: string | null = "";

    // On the client-side
    // if (typeof window !== "undefined") {
    //   const session = await getSession();
    //   if (session?.accessToken) {
    //     token = session.accessToken as string;
    //   }
    // } else {
    //   // On the server-side
    //   const req = config?.headers?.req; // You may pass `req` in SSR context
    //   const secret = process.env.NEXTAUTH_SECRET;
    //   const tokenData = await getToken({ req, secret });
    //   token = tokenData?.accessToken as string;
    // }

    token = getLocalToken();

    // console.log(token);

    // If we have a token, add it to the headers
    if (token) {
      config.headers["token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
