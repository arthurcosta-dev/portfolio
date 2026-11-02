import Spinner from "../ui/Spinner";

const AuthChecking = ({ label = "Conferindo o login" }) => (
  <div
    role="status"
    aria-label={label}
    className="text-acento-claro flex min-h-[60svh] items-center justify-center"
  >
    <Spinner />
  </div>
);

export default AuthChecking;
