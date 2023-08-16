import axios from "axios";

export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:9000";

export const serverAxios = (accessToken?: string | null) => {
  const res = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};
