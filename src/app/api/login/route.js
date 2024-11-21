import { connectToDb, executeQuery } from "@app/_lib/db";
import sql from "mssql"; // Ensure you have mssql library installed

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ field: "validation", message: "Username and password are required" }),
        { status: 400 },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      );
    }

    // Connect to the database
    await connectToDb("PS_UserData");

    // Fetch the user by username
    const query = `
      SELECT * FROM PS_UserData.dbo.Users_Master 
      WHERE UserID = @username
    `;

    const params = [
      { name: "username", type: sql.NVarChar, value: username },
    ];

    const result = await executeQuery(query, params);

    // Handle user not found
    if (!result || result.length === 0) {
      return new Response(
        JSON.stringify({ field: "username", message: "User doesn't exist." }),
        { status: 401 },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      );
    }

    const user = result[0];

    if (password === user.Pw) {
      return new Response(JSON.stringify({ field: "success", message: "logged", user: user}))
    } else {
      return new Response(
        JSON.stringify({ field: "password", message: "Invalid password." }),
        { status: 401 },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      );
    }
  } catch (err) {
    console.error("Error during login process:", err);
    return new Response(
      JSON.stringify({
        field: "error",
        error: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500 },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    );
  }
}

// CORS Preflight Handling
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}