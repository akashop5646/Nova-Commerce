import React from "react";
import { useSession } from "../providers/SessionProvider";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requireAuth = true,
  requireOnboarding = true
}) => {
  const { session } = useSession();

  if (requireAuth && (!session || !session.isAuthenticated)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You must login to view this workspace page.</p>
        <button onClick={() => window.location.hash = "/login"}>Go to Login</button>
      </div>
    );
  }

  if (requireAuth && requireOnboarding && session && !session.hasCompletedOnboarding) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Onboarding Pending</h2>
        <p>Please complete onboarding wizard to initialize your workspace.</p>
        <button onClick={() => window.location.hash = "/onboarding"}>Start Onboarding</button>
      </div>
    );
  }

  return <>{children}</>;
};
