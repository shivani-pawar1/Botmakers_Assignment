import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

// ✅ Create API instance
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ Request interceptor (add token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  role: string;
};

export type ErrorResponse = {
  message: string;
};


// ✅ REGISTER
export const register = async (
  userData: AuthRequest
): Promise<AxiosResponse<AuthResponse>> => {
  try {
    return await api.post("/api/auth/register", userData);
  } catch (error) {
    throw error;
  }
};


// ✅ LOGIN
export const login = async (
  user: AuthRequest
): Promise<AxiosResponse<AuthResponse | ErrorResponse>> => {
  try {
    return await api.post("/api/auth/login", user);
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    if (err.response) {
      return err.response; // ✅ return backend error
    }

    throw error;
  }
};


// ✅ GET USERS
export const getUsers = async (): Promise<any> => {
  try {
    const response = await api.get("/api/auth/allUsers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// ✅ GET ADMINS
export const getAdmins = async (): Promise<any> => {
  try {
    const response = await api.get("/api/auth/allUsers?role=ADMIN");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};