import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.NEXT_PUBLIC_USER || !process.env.NEXT_PUBLIC_PASS || !process.env.NEXT_PUBLIC_SERVER) {
  throw new Error("Missing required environment variables");
}

const userDB = process.env.NEXT_PUBLIC_USER;
const password = process.env.NEXT_PUBLIC_PASS;
const server = process.env.NEXT_PUBLIC_SERVER;


// Configuration for your MSSQL server
const baseConfig = {
  user: userDB,
  password: password,
  server: server,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

export const sessionConfig = { ...baseConfig, database: "PS_UserData" };

export async function connectToDb(database) {
  const config = { ...baseConfig, database: database };

  try {
    await sql.connect(config);
    console.log("Connected to MSSQL Database: ", database);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

export async function executeQuery(query, params = []) {
  try {
    const request = new sql.Request();
    params.forEach((param) => request.input(param.name, param.type, param.value));
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Query execution failed:", err);
    throw new Error("Database query failed");
  }
}
