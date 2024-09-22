const getLocalToken = () => {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return token;
};

export default getLocalToken;
