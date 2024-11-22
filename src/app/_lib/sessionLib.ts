import { SessionOptions } from "iron-session";

export interface loginFormData {
    headers: { [key: string]: string };
    username: string,
    password: string
}

export interface loginData {
    isLoggedIn?: boolean,
    user_id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    adminLevel: number
}

export const defaultSession = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: "shaiya-m-session-best-name",
    cookieOptions: {
    //   httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  };