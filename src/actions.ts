"use server";

import { SessionData } from "@/lib";
import { defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE GETSESSION ACTION
export async function getSession() {
  const cookiesStore = cookies();
  const session = await getIronSession<SessionData>(cookiesStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return {
    isLoggedIn: session.isLoggedIn || false,
    username: session.username || null,
    email: session.email || null,
    isAdmin: session.isAdmin || false,
    adminLevel: session.adminLevel || null,
  };
}

export async function login(formData: FormData) {
  const session = await getSession();

  const formDataObj = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // CHECK USER IN DB USING THE USERNAME AND PASSWORD
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
    credentials: "include",
  });

  const user = await response.json();

  if (!user) {
    return { error: "Wrong Credentials!" };
  }

  session.isLoggedIn = true;
  session.username = user.userID;
  session.email = user.Email;

  await session.save();
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}
