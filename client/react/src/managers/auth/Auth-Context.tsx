import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialAuthState } from "./auth-reducer";
import { type Dispatch } from "react";
import { type User } from "../user-profile-manager";

type InitialAuthState = {
  user: User | null;
};

type AuthContext = {
  session: InitialAuthState;
  dispatch: Dispatch<any>;
};

export const AuthContext = createContext<AuthContext>({
  session: initialAuthState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const user = JSON.parse(localUser);
      dispatch({ type: "login", payload: user });
    }
  };

  return (
    <AuthContext.Provider value={{ session, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
