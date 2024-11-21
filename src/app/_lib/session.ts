"use server"

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { loginData } from "./sessionLib";
import { defaultSession, sessionOptions } from "./sessionLib";

export async function getSession() {
    const cookiesStore = cookies();
    const session = await getIronSession<loginData>(cookiesStore, sessionOptions);
    
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    
    // return {
    //     isLoggedIn: session.isLoggedIn,
    //     User: session.user_id,
    //     username: session.username,
    //     email: session.email,
    //     isAdmin: session.isAdmin,
    //     adminLevel: session.adminLevel,
    // };
    return session;
}

export async function login(data: any) {
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
    
    const user = await response.json();
    
    if (!user) {
        return { error: "Wrong Credentials!" };
    }
    
    session.isLoggedIn = true;
    session.user_id = user.userUID;
    session.username = user.userID;
    session.email = user.Email;
    session.isAdmin = user.Admin;
    session.adminLevel = user.AdminLevel;
    await session.save();
}

export async function logout() {
    const session = await getSession();
    session.destroy();
}