import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "@/types";
import { useRefreshToken } from "@/queries/account";
import { ACCESS_TOKEN } from "@/utils/constants";

export type AuthUserDispatch = Dispatch<SetStateAction<User | undefined>>;

export const AuthUserContext = createContext<{
  authUser?: User;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
  isUserLoading?: boolean;
}>({
  setAuthUser: () => undefined,
});

export function AuthUserProvider({ children }: { children?: ReactNode }) {
  const [authUser, setAuthUser] = useState<User>();

  const { mutateAsync: refreshToken, isPending: isUserLoading } =
    useRefreshToken({
      onSuccess: (...params) => {
        const [loginResponse] = params;

        const { accessToken, ...user } = loginResponse;

        localStorage.setItem(ACCESS_TOKEN, accessToken);

        setAuthUser(user);
      },

      onError: () => {
        setAuthUser(undefined);
        localStorage.removeItem(ACCESS_TOKEN);
      },
    });

  // Automatically login user on first entry
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) return;

    refreshToken();
  }, [refreshToken]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser, isUserLoading }}>
      {children}
    </AuthUserContext.Provider>
  );
}
