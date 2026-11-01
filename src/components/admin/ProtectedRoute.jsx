import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import AuthChecking from "./AuthChecking";

// Melhora a navegação. Quem protege os dados de verdade é o RLS do Supabase.
const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <AuthChecking />;
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
