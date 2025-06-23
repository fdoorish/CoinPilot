import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8 row-start-2 w-full">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Welcome to CoinPilot
        </h1>
        <p className="text-gray-500 text-center max-w-xl">
          CoinPilot is your all-in-one crypto portfolio dashboard. Track your
          balances, monitor recent activity, and stay up to date with the latest
          news in the crypto world. Use the login button below to securely
          access your personalized dashboard and manage your digital assets with
          ease.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 w-48 text-center mt-4"
        >
          Login
        </Link>
        <div className="w-full flex justify-end mt-8">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 text-sm"
          >
            Dashboard (debug)
          </Link>
        </div>
      </main>
    </div>
  );
}
