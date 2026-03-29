import { useNavigate } from "react-router-dom";
import AdminCard from "../components/AdminCard.js";
import UserCard from "../components/UserCard.js";
import { useAuth } from "../hooks/useAuth.js";


const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
         navigate("/login");
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <button
        onClick={logout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      {user.role === "ADMIN" ? <AdminCard /> : <UserCard />}
    </div>
  );
};

export default Dashboard;