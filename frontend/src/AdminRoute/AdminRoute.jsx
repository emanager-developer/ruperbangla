import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Components/Spinner/Spinner";

export default function AdminRoute({ children }) {
  const { loggedUser } = useSelector((state) => state.user);

  const location = useLocation();
  const token = localStorage.getItem("gloria_jwt");

  if (!token && loggedUser?.data?.role !== "admin") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && token) {
    return children;
  }

  return <Spinner />;
}
