import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { UserRoles, UserRolesEnum, UserType } from "../Constant";

interface AuthContextType {
  user: UserType | null;
  userPermission: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  navigationPath: any;
  signIn: (data: any) => void;
  signOut: () => void;
  checkUserPermission: (feature: string) => boolean;
}

const defaultContext: AuthContextType = {
  user: null,
  userPermission: null,
  isAuthenticated: false,
  isLoading: true,
  navigationPath: "none",
  signIn: () => {},
  signOut: () => {},
  checkUserPermission: () => false,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userPermission, setUserPermission] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [navigationPath, setNavigationPath] = useState<
    "none" | "admin" | "agency" | "salesman"
  >("none");

  useEffect(() => {
    setIsLoading(true);
    const isAuth = localStorage.getItem("isAuth");
    const userId = localStorage.getItem("userId");
    const user_key_id = localStorage.getItem("user_key_id");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const storedRole = localStorage.getItem("userRole") as UserRoles | null;
    const permission = localStorage.getItem("userPermission");

    if (isAuth && storedRole) {
      const userRole: UserRoles = Object.values(UserRolesEnum).includes(
        storedRole as UserRolesEnum
      )
        ? (storedRole as UserRoles)
        : UserRolesEnum.none;

      const newUser: UserType = {
        userId: userId || "",
        user_key_id: user_key_id || "",
        username: username || "",
        email: email || "",
        userRole,
      };

      setUser(newUser);
      setIsAuthenticated(true);
      setUserPermission(permission ? JSON.parse(permission) : []);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (
      user?.userRole === UserRolesEnum.admin
    ) {
      setNavigationPath("admin");
    } else {
      setNavigationPath("none");
    }
  }, [user]);

  const signOut = useCallback(() => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setUserPermission(null);
  }, []);

  const signIn = useCallback((data: any) => {
    const { isAuthDone, userData, userPermission } = data;

    localStorage.setItem("isAuth", String(isAuthDone));
    localStorage.setItem("name", userData?.name);
    localStorage.setItem("userId", userData?.userId);
    localStorage.setItem("user_key_id", userData?.user_key_id);
    localStorage.setItem("username", userData?.username);
    localStorage.setItem("userRole", userData?.userRole);
    localStorage.setItem("email", userData?.email);
    localStorage.setItem("userPermission", JSON.stringify(userPermission));

    setUser({
      userId: userData?.userId,
      user_key_id: userData?.user_key_id,
      username: userData?.username,
      userRole: userData?.userRole,
      email: userData?.email,
    });

    setIsAuthenticated(true);
    setUserPermission(userPermission);
  }, []);

  const checkUserPermission = useCallback(
    (feature: string): boolean => {
      if (!userPermission || !Array.isArray(userPermission)) return false;

      return userPermission.some((category) =>
        category.features?.some(
          (perm: { navigation: string }) => perm.navigation === feature
        )
      );
    },
    [userPermission]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        userPermission,
        isAuthenticated,
        isLoading,
        navigationPath,
        signIn,
        signOut,
        checkUserPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthChecker = () => useContext(AuthContext);
