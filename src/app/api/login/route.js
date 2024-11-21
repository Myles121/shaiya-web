// app/api/register/route.js
import { connectToDb, executeQuery } from "@app/_lib/db";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Connect to the database
    await connectToDb("PS_UserData");

    // Query to check if the user exists and password matches
    const query = `
        SELECT * FROM PS_UserData.dbo.Users_Master WHERE UserID = '${username}' AND Pw = '${password}'
      `;
    const result = await executeQuery(query);

    // Handle invalid username or password
    if (!result || result.length === 0) {
      return new Response(JSON.stringify({ field: "username", message: "Invalid username or password" }), {
        status: 401,
      });
    }

    const user = result[0];

    // Send response to the client
    return new Response(
      JSON.stringify({
        field: "success",
        message: "Logged in successfully.",
        user: user
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ field: "error", error: "Failed to fetch data.", details: err.message }),
      {
        status: 500,
      }
    );
  }
};
