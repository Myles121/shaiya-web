// app/api/register/route.js
import requestIp from "request-ip";

import { connectToDb, executeQuery } from "@app/_lib/db";

export async function POST(req) {
  const { username, password, email } = await req.json(); // Parse JSON body

  const userIP = requestIp.getClientIp(req);

  await connectToDb("PS_UserData");

  // Check if user already exists
  const userExists = await executeQuery(`
    SELECT * FROM PS_UserData.dbo.Users_Master WHERE UserID = '${username}'
  `);

  if (userExists.length > 0) {
    return new Response(
      JSON.stringify({
        field: "username",
        message: "User already exists!",
      }),
      {
        status: 400,
      }
    );
  }

  const emailExists = await executeQuery(`
    SELECT * FROM PS_UserData.dbo.Users_Master WHERE Email = '${email}'
  `);

  if (emailExists.length > 0) {
    return new Response(
      JSON.stringify({
        field: "email",
        message: "Email already exist!",
      }),
      {
        status: 400,
      }
    );
  }

  // Insert new user
  const query = `
    INSERT INTO PS_UserData.dbo.Users_Master
      (UserID, Pw, Admin, AdminLevel, UseQueue, Status, Leave, UserType, UserIp, Email)
    VALUES 
      ('${username}', '${password}', 0, 0, 0, 0, 0, 'N', '${userIP}', '${email}')
  `;

  await executeQuery(query);

  return new Response(
    JSON.stringify({
      field: "success",
      message: "User registered successfully!",
    }),
    {
      status: 200,
    }
  );
}
