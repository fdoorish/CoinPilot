"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SettingsModal from "../components/SettingsModal"; // Import the updated SettingsModal

const accounts = [
  { name: "Lloyds", holder: "Alice Smith", balance: 3200.45, interest: 1.2 },
  { name: "American Express", holder: "Bob Johnson", balance: 5400.0, interest: 0.8 },
  { name: "Chase", holder: "Charlie Lee", balance: 2100.75, interest: 1.5 },
  { name: "Monzo", holder: "Dana White", balance: 1500.0, interest: 1.0 },
  { name: "Revolut", holder: "Eve Black", balance: 4200.25, interest: 0.9 },
];

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // State for light/dark mode
  const [selected, setSelected] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State to control the settings modal
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Carousel scroll handler (faster)
  function scrollCarousel(direction: "left" | "right") {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({ left: direction === "left" ? -width : width, behavior: "smooth" });
  }

  // Allow horizontal scroll with mouse wheel (faster)
  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (carouselRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      carouselRef.current.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
      e.preventDefault();
    }
  }

  // Calculate total balance
  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Theme classes
  const theme = darkMode
    ? {
        bg: "bg-black",
        text: "text-white",
        sidebar: "bg-black border-r-2 border-white",
        card: (i: number) =>
          i % 2 === 0
            ? "bg-white text-black border border-white"
            : "bg-black text-white border border-white",
        button: "bg-white text-black hover:bg-gray-200",
        arrow: "bg-white text-black border border-white",
      }
    : {
        bg: "bg-white",
        text: "text-black",
        sidebar: "bg-white border-r-2 border-black",
        card: (i: number) =>
          i % 2 === 0
            ? "bg-white text-black border border-black"
            : "bg-black text-white border border-black",
        button: "bg-black text-white hover:bg-gray-800",
        arrow: "bg-black text-white border border-black",
      };

  return (
    <div className={`flex min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col w-56 p-6 shadow-lg ${theme.sidebar}`} style={{ minHeight: '100vh', height: '100vh' }}>
        <h2 className={`text-2xl font-bold mb-10 tracking-tight ${theme.text}`}>Menu</h2>
        <nav className="flex flex-col gap-4 mt-4">
          <Link href="/dashboard" className={`${theme.text}/90 hover:${theme.text} font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10`}>
            Dashboard
          </Link>
          {/* Open Settings Modal */}
          <button
            onClick={() => setIsSettingsOpen(true)} // Open the settings modal
            className={`${theme.text}/90 hover:${theme.text} font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10 text-left`}
          >
            Settings
          </button>
          <Link href="/stocks" className={`${theme.text}/90 hover:${theme.text} font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10`}>
            Stocks
          </Link>
          <button
            onClick={() => router.push("/")}
            className={`${theme.text}/90 hover:${theme.text} font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10 text-left`}
          >
            Sign Out
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-4 md:px-16">
        <h1 className={`text-4xl font-bold mb-2 mt-2 tracking-tight ${theme.text}`}>CoinPilot</h1>
        <p className={`text-center max-w-xl mb-4 ${theme.text === "text-white" ? "text-gray-300" : "text-gray-500"}`}>
          Welcome to your dashboard. Here you can view your connected bank accounts and manage your finances in one place.
        </p>
        <div className="text-5xl font-extrabold mb-8" style={{ letterSpacing: '-2px' }}>
          £{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="relative w-full max-w-3xl flex items-center">
          <div
            ref={carouselRef}
            onWheel={handleWheel}
            className="flex gap-8 overflow-x-auto no-scrollbar py-4 px-2 w-full cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: "x mandatory" }}
            // Add drag-to-scroll
            onMouseDown={e => {
              const startX = e.pageX;
              const scrollLeft = carouselRef.current?.scrollLeft ?? 0;
              function onMove(ev: MouseEvent) {
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = scrollLeft - (ev.pageX - startX);
                }
              }
              function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
              }
              document.addEventListener('mousemove', onMove);
              document.addEventListener('mouseup', onUp);
            }}
          >
            {accounts.map((acc, i) => (
              <div
                key={acc.name + i}
                className={`min-w-[260px] h-36 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-semibold transition-colors duration-300 cursor-pointer ${theme.card(i)} ${selected === i ? 'scale-105 ring-4 ring-blue-400 z-20' : ''}`}
                style={{ scrollSnapAlign: "center", transition: 'transform 0.2s' }}
                onClick={() => setSelected(i)}
              >
                {acc.name}
              </div>
            ))}
          </div>
        </div>
        {/* Popout modal for account info */}
        {selected !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40" onClick={() => setSelected(null)}>
            <div
              className="bg-white text-black rounded-3xl shadow-2xl p-12 min-w-[400px] max-w-lg w-full relative animate-pop scale-110 flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}
            >
              <button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-black" onClick={() => setSelected(null)}>&times;</button>
              <h2 className="text-3xl font-bold mb-4 text-center">{accounts[selected].name}</h2>
              <div className="mb-4 text-lg"><span className="font-semibold">Account Holder:</span> {accounts[selected].holder}</div>
              <div className="mb-4 text-lg"><span className="font-semibold">Current Balance:</span> £{accounts[selected].balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-lg"><span className="font-semibold">Interest Rate:</span> {accounts[selected].interest}%</div>
            </div>
            <style jsx>{`
              .animate-pop {
                animation: pop 0.2s cubic-bezier(.4,2,.6,1) both;
              }
              @keyframes pop {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1.1); opacity: 1; }
              }
            `}</style>
          </div>
        )}
        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          darkMode={darkMode} // Pass darkMode state
          setDarkMode={setDarkMode} // Pass setDarkMode function
        />
      </main>
    </div>
  );
}
