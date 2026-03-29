import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { login } from "../api/axios.js";

type UserType = {
  email: string;
  password: string;
};

function Login(): JSX.Element {
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(user); // ✅ FIXED

      if (res.data.message) {
        alert(res.data.message);
        return;
      }

      loginUser(res.data.token, res.data.role);
      navigate("/dashboard");

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleForm}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleInput}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleInput}
          className="w-full p-2 mb-3 border rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
        <center><Link to={"/register"}>Create an Account</Link></center>
      </form>
    </div>
  );
}

export default Login;