import type { FC, PropsWithChildren } from "react";
import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "src/components/hooks/useLocalStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { handleLoad } = useLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check token in localStorage when the component mounts
    const token = handleLoad("SW-EMAIL");
    setIsAuthenticated(!!token); // Set isAuthenticated to true if there's a token
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
