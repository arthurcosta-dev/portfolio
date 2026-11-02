import { Suspense } from "react";
import { Outlet } from "react-router";
import AuthProvider from "../../context/AuthProvider";
import AuthChecking from "./AuthChecking";

// A sessão só é conferida em /login e /admin: quem só visita não baixa o Supabase.
// O carregamento tem a altura do login, para o rodapé não saltar quando a página chega.
const AuthLayout = () => (
  <AuthProvider>
    <Suspense fallback={<AuthChecking />}>
      <Outlet />
    </Suspense>
  </AuthProvider>
);

export default AuthLayout;
