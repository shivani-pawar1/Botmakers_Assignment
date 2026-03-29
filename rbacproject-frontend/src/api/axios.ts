import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

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


export const register = async (
  userData: AuthRequest
): Promise<AxiosResponse<AuthResponse>> => {
  try {
    return await api.post("/api/auth/register", userData);
  } catch (error) {
    throw error;
  }
};


export const login = async (
  user: AuthRequest
): Promise<AxiosResponse<AuthResponse | ErrorResponse>> => {
  try {
    return await api.post("/api/auth/login", user);
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    if (err.response) {
      return err.response; 
    }

    throw error;
  }
};


export const getUsers = async (): Promise<any> => {
  try {
    const response = await api.get("/api/auth/allUsers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getAdmins = async (): Promise<any> => {
  try {
    const response = await api.get("/api/auth/allUsers?role=ADMIN");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};