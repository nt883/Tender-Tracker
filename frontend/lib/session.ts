export type Role = "official" | "contractor" | "auditor";

export interface Session {
  role: Role;
  userId: string;
  name: string;
}

const SESSION_KEY = "tender-tracker-session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage unavailable — fail silently
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage unavailable — fail silently
  }
}