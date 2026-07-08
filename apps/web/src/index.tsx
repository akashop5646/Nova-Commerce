import React from "react";
import { SessionProvider } from "./providers/SessionProvider";
import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";
import { ForgotPassword } from "./auth/ForgotPassword";
import { Onboarding } from "./onboarding/Onboarding";
import { DashboardOverview } from "./dashboard/overview/DashboardOverview";
import { WebsiteWizard } from "./dashboard/projects/create/WebsiteWizard";
import { StudioLayout } from "./dashboard/studio/layout/StudioLayout";
import { BuilderIntegration } from "./dashboard/studio/state/BuilderIntegration";
import { HistoryBridge } from "./dashboard/studio/state/HistoryBridge";

// Shared exports
export { SessionProvider, Login, Signup, ForgotPassword, Onboarding, DashboardOverview, WebsiteWizard, StudioLayout, BuilderIntegration, HistoryBridge };

export function init() {
  console.log("Klin Studio Application initialized.");
}

init();
export default init;
