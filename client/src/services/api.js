import axios from "axios";

const LOCAL_API_BASE = "http://localhost:5000/api";
const PROD_API_BASE = "https://movie-review-main-production.up.railway.app/api";

const isLocalEnvironment =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (isLocalEnvironment ? LOCAL_API_BASE : PROD_API_BASE);

export const api = axios.create({ baseURL: API_BASE });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}