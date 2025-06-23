export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-black rounded">
            <h2 className="font-semibold mb-2 text-white">Balance</h2>
            <p className="text-2xl font-mono text-white">$12,345.67</p>
          </div>
          <div className="p-4 bg-black rounded">
            <h2 className="font-semibold mb-2 text-white">Recent Activity</h2>
            <ul className="text-sm list-disc ml-5 text-white">
              <li>Bought 0.5 BTC</li>
              <li>Sold 2 ETH</li>
              <li>Received 100 USDT</li>
            </ul>
          </div>
          <div className="p-4 bg-black rounded">
            <h2 className="font-semibold mb-2 text-white">Quick Stats</h2>
            <ul className="text-sm text-white">
              <li>Portfolio Change: <span className="text-green-400">+5.2%</span></li>
              <li>Top Asset: <span className="font-mono">BTC</span></li>
              <li>Last Login: Today</li>
            </ul>
          </div>
          <div className="p-4 bg-black rounded">
            <h2 className="font-semibold mb-2 text-white">News</h2>
            <ul className="text-sm list-disc ml-5 text-white">
              <li>Bitcoin hits new all-time high</li>
              <li>Ethereum 2.0 launches</li>
              <li>USDT market cap surges</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
