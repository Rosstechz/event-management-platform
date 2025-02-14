import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../store/adminAuth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAdminAuthenticated } = useAdminAuth();
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
