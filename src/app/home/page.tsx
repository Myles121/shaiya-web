import { getSession } from "@/actions";

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      <h1>Session Data:</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}