// app/api/test/route.js

export async function GET() {
  // Access environment variable
  const user = process.env.NEXT_PUBLIC_USER;

  // Log the environment variable
  console.log('Environment variable MY_ENV_VAR:', user);

  return new Response(
    JSON.stringify({ message: 'Hello from the /api/test route!', user }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}