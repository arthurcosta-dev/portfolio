import { Outlet } from "react-router";
import AuthProvider from "../../context/AuthProvider";

// A sessão só é conferida em /login e /admin: quem só visita não baixa o Supabase.
const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export default AuthLayout;
