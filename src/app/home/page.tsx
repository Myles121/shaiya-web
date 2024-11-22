import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-[90vh] px-32 py-10 overflow-hidden">
      <div className="p-10 items-center shadow-lg w-full max-w-2xl">
        <h1 className="text-center text-4xl font-bold text-white mb-8 drop-shadow-lg">
          SHAIYA M
        </h1>
        <div className="flex justify-center">
          <div className="text-white text-2xl mb-4">
            {/* download */}
            <Link href="/download" className="font-bold">
                Download Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}