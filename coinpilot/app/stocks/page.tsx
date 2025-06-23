"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";


// static data for the stocks page
  const stocksData = [
    { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 150.00 , change: 1.2 },
    { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', price: 280.00 , change: 0.8},
    { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3400.00, change: 2.3 },
    { id: 4, name: 'Tesla Inc.', symbol: 'TSLA', price: 700.00 , change: -1.5},
    { id: 5, name: 'Alphabet Inc.', symbol: 'GOOGL', price: 2800.00, change: -0.5 },
  ];

export default function StocksPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-white text-black transition-colors duration-300">
      {/* Sidebar/Menu Bar */}
      <aside className="hidden md:flex flex-col w-56 p-6 shadow-lg bg-white border-r-2 border-black" style={{ minHeight: '100vh', height: '100vh' }}>
        <h2 className="text-2xl font-bold mb-10 tracking-tight text-black">Menu</h2>
        <nav className="flex flex-col gap-4 mt-4">
          <Link href="/dashboard" className="text-black/90 hover:text-black font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10">Dashboard</Link>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="text-black/90 hover:text-black font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10 text-left"
          >
            Settings
          </button>
          <Link href="/stocks" className="text-black/90 hover:text-black font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10">Stocks</Link>
          <button
            onClick={() => router.push("/")}
            className="text-black/90 hover:text-black font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10 text-left"
          >
            Sign Out
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 md:px-16">
        <div className="max-w-lg w-full p-8 bg-white text-black rounded shadow">
          <h1 className="text-3xl font-bold mb-4">Stocks</h1>
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Change(%)</th>
              </tr>
            </thead>
            <tbody>
              {stocksData.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 px-4 py-2 text-left font-medium">{stock.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{stock.symbol}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-semibold">{stock.price.toFixed(2)}</td>
                  <td className={`border border-gray-300 px-4 py-2 text-right font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

