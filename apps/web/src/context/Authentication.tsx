import { Hanko } from "@teamhanko/hanko-frontend-sdk";
import { createContext, useEffect, useState, ReactNode } from "react";

// Initialize Hanko with your API URL
const hanko = new Hanko(import.meta.env.VITE_HANKO_API_URL as string);

interface AuthContextType {
  hanko: Hanko;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = () => {
      try {
        const session = hanko.session.get();
        setIsAuthenticated(!!session);
      } catch (error) {
        // Send error to exception tracking service
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to session changes
    const unsubscribe = hanko.onSessionExpired(() => {
      checkSession();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ hanko, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
