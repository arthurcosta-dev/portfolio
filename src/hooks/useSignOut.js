import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/auth";

const useSignOut = () => useMutation({ mutationFn: signOut });

export default useSignOut;
