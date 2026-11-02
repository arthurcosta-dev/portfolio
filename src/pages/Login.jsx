import { Navigate } from "react-router";
import AuthChecking from "../components/admin/AuthChecking";
import LoginForm from "../components/admin/LoginForm";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";

const Login = () => {
  const { session, isLoading } = useAuth();
  usePageTitle("Entrar");

  if (isLoading) {
    return <AuthChecking />;
  }
  if (session) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-[1360px] flex-col items-center justify-center px-6 py-16">
      <h1 className="text-center font-serif text-[40px] leading-[1.1] font-light tracking-[-0.03em] lg:text-[52px]">
        Entrar
      </h1>
      <p className="text-texto-suave mt-3 max-w-[40ch] text-center text-base leading-normal">
        Área restrita ao dono do site.
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
