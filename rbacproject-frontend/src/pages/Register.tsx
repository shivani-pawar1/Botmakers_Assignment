import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/axios.js";

type UserType = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "";
};

function Register(): JSX.Element {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.role) {
      alert("Please select role");
      return;
    }

    try {
      const res = await register(user);

      if (res.data) {
        alert("Register Successful ✅");
        navigate("/login");
      }
    } catch {
      alert("User already exists ❌");
    }

    setUser({ name: "", email: "", password: "", role: "" });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleForm}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleInput}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleInput}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleInput}
          className="w-full p-2 mb-3 border rounded"
        />

        <div className="mb-3">
          <p className="font-medium mb-1">Select Role:</p>

          <label className="mr-4">
            <input
              type="radio"
              value="USER"
              name="role"
              onChange={handleInput}
              checked={user.role === "USER"}
            />{" "}
            USER
          </label>

          <label>
            <input
              type="radio"
              value="ADMIN"
              name="role"
              onChange={handleInput}
              checked={user.role === "ADMIN"}
            />{" "}
            ADMIN
          </label>
        </div>

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>
        <center><Link  to={"/login"}>Already have an Account</Link></center> 
      </form>
    </div>
  );
}

export default Register;