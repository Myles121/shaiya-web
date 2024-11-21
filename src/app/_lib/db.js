import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

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

export async function executeQuery(query) {
  try {
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Query execution failed:", err);
    throw err;
  }
}
