import Link from 'next/link';


// static data for the stocks page
  const stocksData = [
    { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 150.00 , change: 1.2 },
    { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', price: 280.00 , change: 0.8},
    { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3400.00, change: 2.3 },
    { id: 4, name: 'Tesla Inc.', symbol: 'TSLA', price: 700.00 , change: -1.5},
    { id: 5, name: 'Alphabet Inc.', symbol: 'GOOGL', price: 2800.00, change: -0.5 },
  ];

export default function StocksPage() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
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
  );
}

