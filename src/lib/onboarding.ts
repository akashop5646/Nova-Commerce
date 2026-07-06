import { useSyncExternalStore } from "react";

export type OnboardingState = {
  storeName: string;
  sellingStatus: "online" | "past" | "new" | "";
  revenue: "none" | "under10k" | "10k-100k" | "100k+" | "";
  productType: "physical" | "digital" | "services" | "unsure" | "";
  channels: string[];
  email: string;
};

const KEY = "kiln.onboarding.v1";
const empty: OnboardingState = {
  storeName: "",
  sellingStatus: "",
  revenue: "",
  productType: "",
  channels: [],
  email: "",
};

let state: OnboardingState = empty;
const listeners = new Set<() => void>();
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {}
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function setOnboarding(patch: Partial<OnboardingState>) {
  hydrate();
  state = { ...state, ...patch };
  persist();
  listeners.forEach((l) => l());
}

export function resetOnboarding() {
  state = empty;
  persist();
  listeners.forEach((l) => l());
}

export function useOnboarding(): OnboardingState {
  hydrate();
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => empty,
  );
}