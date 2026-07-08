export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  PROJECTS: "/dashboard/projects",
  TEMPLATES: "/dashboard/templates",
  STUDIO: "/dashboard/studio/:websiteId",
  PREVIEW: "/dashboard/preview/:websiteId",
  PUBLISH: "/dashboard/publish/:websiteId",
  SETTINGS: "/dashboard/settings",
  PROFILE: "/dashboard/profile",
  BILLING: "/dashboard/billing",
  TEAM: "/dashboard/team",
  MARKETPLACE: "/dashboard/marketplace"
};

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
