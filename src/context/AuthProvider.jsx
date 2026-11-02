import useAuthSession from "../hooks/useAuthSession";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const auth = useAuthSession();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
