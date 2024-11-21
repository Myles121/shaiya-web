"use server";

import { getSession } from "@app/_lib/session";
import { loginFormData } from "@app/_lib/sessionLib";

export async function login(data: loginFormData) {
  const session = await getSession();

  const formDataObj = {
    username: data.username,
    password: data.password,
  };

  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
    credentials: "include",
  });

  const res = await response.json();

  if (res.error) {
    console.log("it work")
    return res.message
  }

  if (res.field === "success") {
    session.isLoggedIn = true;
    session.user_id = res.user.UserUD;
    session.username = res.user.UserID;
    session.email = res.user.Email;
    session.isAdmin = res.user.Admin;
    session.adminLevel = res.user.AdminLevel;
    await session.save();
  }
}
