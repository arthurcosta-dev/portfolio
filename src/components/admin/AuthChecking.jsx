import Spinner from "../ui/Spinner";

const AuthChecking = () => (
  <div
    role="status"
    aria-label="Conferindo o login"
    className="text-acento-claro flex min-h-[60svh] items-center justify-center"
  >
    <Spinner />
  </div>
);

export default AuthChecking;
