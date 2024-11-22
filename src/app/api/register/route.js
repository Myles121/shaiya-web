// app/api/register/route.js
import requestIp from "request-ip";
import { connectToDb, executeQuery } from "@app/_lib/db";
import sql from "mssql"; // Ensure you have mssql library installed

export async function POST(req) {
  try {
    // Parse JSON body
    const { username, password, email } = await req.json();

    const userIP = requestIp.getClientIp(req) || "0.0.0.0";

    // Connect to the database
    await connectToDb("PS_UserData");

    // Check if the username already exists
    const userExistsQuery = `
      SELECT 1 FROM PS_UserData.dbo.Users_Master WHERE UserID = @username
    `;
    const userExists = await executeQuery(userExistsQuery, [
      { name: "username", type: sql.NVarChar, value: username },
    ]);

    if (userExists.length > 0) {
      return new Response(
        JSON.stringify({
          field: "username",
          message: "Username already exists.",
        }),
        { status: 400 }
      );
    }

    // Check if the email already exists
    const emailExistsQuery = `
      SELECT 1 FROM PS_UserData.dbo.Users_Master WHERE Email = @Email
    `;
    const emailExists = await executeQuery(emailExistsQuery, [
      { name: "email", type: sql.NVarChar, value: email },
    ]);

    if (emailExists.length > 0) {
      return new Response(
        JSON.stringify({ field: "email", message: "Email already exists." }),
        { status: 400 }
      );
    }

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO PS_UserData.dbo.Users_Master 
        (UserID, Pw, Admin, AdminLevel, UseQueue, Status, Leave, UserType, UserIp, Email)
      VALUES 
        (@username, @password, 0, 0, 0, 0, 0, 'N', @userIP, @Email)
    `;

    await executeQuery(insertUserQuery, [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "password", type: sql.NVarChar, value: password },
      { name: "userIP", type: sql.NVarChar, value: userIP },
      { name: "Email", type: sql.NVarChar, value: email },
    ]);

    return new Response(
      JSON.stringify({
        field: "success",
        message: "User registered successfully!",
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during user registration:", err);
    return new Response(
      JSON.stringify({
        field: "error",
        message: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
