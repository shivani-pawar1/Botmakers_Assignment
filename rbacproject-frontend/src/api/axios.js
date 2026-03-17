import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:8080"
})

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async(userData) => {
   try {
     const response = await api.post("/api/auth/register", userData);
     return response.data;

   } catch (error) {
     console.log(error);
   } 
} 

export const login = async(user) =>{
    try {
        const response = await api.post("/api/auth/login", user);
        const token  = response.data.token;
        localStorage.setItem("token" , token);
        return response;

    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async() =>{
    try {
        const response = api.get("/api/auth/allUsers","USER");     
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAdmins = async() =>{
    try {
        const response = api.get("/api/auth/allUsers","ADMIN")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}