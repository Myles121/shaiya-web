import { connectToDb, executeQuery } from "@app/_lib/db";
import sql from "mssql"; // Ensure you have mssql library installed

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Connect to the database
    await connectToDb("PS_UserData");

    // Fetch the user by username
    const userExistsQuery = `
      SELECT * FROM PS_UserData.dbo.Users_Master 
      WHERE UserID = @username
    `;

    const userExists = await executeQuery(userExistsQuery, [
      { name: "username", type: sql.NVarChar, value: username },
    ]);

    // Handle user not found
    if (!userExists || userExists.length === 0) {
      return new Response(
        JSON.stringify({ field: "username", message: "User doesn't exist." }),
        { status: 401 }
      );
    }

    const user = userExists[0];

    if (password !== user.Pw) {
      return new Response(
        JSON.stringify({ field: "password", message: "Invalid password." }),
        { status: 401 }
      );
    } else {
      return new Response(
        JSON.stringify({ field: "success", message: "logged", user: user }),
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Error during login process:", err);
    return new Response(
      JSON.stringify({
        field: "error",
        error: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
