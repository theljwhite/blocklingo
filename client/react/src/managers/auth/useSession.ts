import { useContext } from "react";
import { AuthContext } from "./Auth-Context";

export const useSession = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("Missing AuthProvider wrapper");
  }
  return ctx;
};
