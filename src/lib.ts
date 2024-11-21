import { SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  isAdmin: boolean;
  adminLevel: number;
  userId?: string;
  username?: string;
  email?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  isAdmin: false,
  adminLevel: 0
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: process.env.SESSION_SECRET!,
  cookieName: "shaiya-m-session-best-name",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
};