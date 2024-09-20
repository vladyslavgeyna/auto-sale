import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { User } from "@/types";

export type AuthUserDispatch = Dispatch<SetStateAction<User | undefined>>;

export const AuthUserContext = createContext<{
  authUser?: User;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
}>({
  setAuthUser: () => undefined,
});

export function AuthUserProvider({ children }: { children?: ReactNode }) {
  const [authUser, setAuthUser] = useState<User>();

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}
