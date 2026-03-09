import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "@api/user";
import { AuthAPI } from "@api/auth";
import type { LoginCredentials, UserInfo } from "@customTypes/user";

type AuthContextType = {
  token: string | null;
  user: UserInfo | null;
  login: (creds: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authAPI = new AuthAPI();
const userAPI = new UserAPI();

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async (cred: LoginCredentials) => {
    const token = await userAPI.loginUser(cred);
    localStorage.setItem("token", token);
    setToken(token);
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
    queryClient.invalidateQueries({ queryKey: ["currentUserReviews"] });
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
    queryClient.invalidateQueries({ queryKey: ["currentUserReviews"] });
  }, [queryClient]);

  const checkToken = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      await authAPI.validateToken(token);
      const userInfo = await userAPI.getUser();
      setUser(userInfo);
    } catch {
      logout();
    }
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      checkToken();
    }
  }, [token, checkToken]);

  /*
   * Revalidate the token on an interval and log out if it expires.
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    const id = setInterval(() => {
      checkToken();
    }, 3_600_000);

    return () => clearInterval(id);
  }, [token, checkToken]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
