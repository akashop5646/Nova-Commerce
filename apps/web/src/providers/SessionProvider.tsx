import React, { createContext, useContext, useState } from "react";

export interface UserSession {
  email: string;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
}

interface SessionContextType {
  session: UserSession | null;
  login: (email: string) => void;
  logout: () => void;
  setOnboardingCompleted: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>({
    email: "guest@klin.io",
    isAuthenticated: false,
    hasCompletedOnboarding: false
  });

  const login = (email: string) => {
    setSession({
      email,
      isAuthenticated: true,
      hasCompletedOnboarding: false
    });
  };

  const logout = () => {
    setSession({
      email: "",
      isAuthenticated: false,
      hasCompletedOnboarding: false
    });
  };

  const setOnboardingCompleted = () => {
    if (session) {
      setSession({
        ...session,
        hasCompletedOnboarding: true
      });
    }
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, setOnboardingCompleted }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
