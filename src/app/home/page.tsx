import { getSession } from "@app/_lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      <h1>Haluuu</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}