"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SettingsModal from "../components/SettingsModal"; // For default export
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [accounts, setAccounts] = useState<any[]>([]);
	const carouselRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		// Fetch accounts
		fetch("http://127.0.0.1:8000/api/accounts")
			.then((res) => res.json())
			.then((data) => setAccounts(Array.isArray(data) ? data : []));
	}, []);

	// Calculate total as the sum of all account balances (as floats)
	const total = accounts.reduce((sum, acc) => sum + (parseFloat(acc.balance) || 0), 0);

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
						onClick={() => setIsSettingsOpen(true)}
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
				<div className="relative w-full max-w-3xl flex items-center">
					<div
						ref={carouselRef}
						onWheel={handleWheel}
						className="flex gap-8 overflow-x-auto no-scrollbar py-4 px-2 w-full cursor-grab active:cursor-grabbing"
						style={{ scrollSnapType: "x mandatory" }}
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
						{accounts.length === 0 && (
							<div className="text-gray-400 text-center w-full">No accounts found.</div>
						)}
						{accounts.map((acc, i) => (
							<div
								key={acc.id || acc.owner_name || i}
								className={`min-w-[361px] h-50 rounded-2xl shadow-lg flex flex-col items-center justify-center text-2xl font-semibold transition-colors duration-300 cursor-pointer ${theme.card(i)} ${selected === i ? 'scale-105 ring-4 ring-blue-400 z-20' : ''}`}
								style={{ scrollSnapAlign: "center", transition: 'transform 0.2s' }}
								onClick={() => setSelected(i)}
							>
								<div className="text-xl font-bold mb-2">{acc.owner_name}</div>
							</div>
						))}
					</div>
				</div>
				{/* Move total and pie chart below cards */}
				{accounts.length > 0 && (
					<div className="w-full flex flex-col items-center mt-8 mb-8">
						<div className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-black'}`} style={{ letterSpacing: '-2px' }}>
							£{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</div>
						<div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-10 flex flex-col items-center" style={{ height: 442 }}>
							<h3 className="text-xl font-bold mb-2 text-center text-black">Account Contributions</h3>
							<Pie
								data={{
									labels: accounts.map(acc => acc.owner_name),
									datasets: [
										{
											data: accounts.map(acc => parseFloat(acc.balance) || 0),
											backgroundColor: [
												'#60a5fa', '#fbbf24', '#34d399', '#f87171', '#a78bfa', '#f472b6', '#facc15', '#38bdf8', '#4ade80', '#f472b6'
											],
											borderWidth: 1,
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											labels: {
												color: '#000',
												font: { size: 14 }
											}
										}
									}
								}}
							/>
						</div>
					</div>
				)}
				{/* Popout modal for account info */}
				{selected !== null && accounts[selected] && (
					<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40" onClick={() => setSelected(null)}>
						<div
							className="bg-white text-black rounded-3xl shadow-2xl p-12 min-w-[400px] max-w-lg w-full relative animate-pop scale-110 flex flex-col items-center justify-center"
							onClick={e => e.stopPropagation()}
							style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}
						>
							<button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-black" onClick={() => setSelected(null)}>&times;</button>
							<h2 className="text-3xl font-bold mb-4 text-center">{accounts[selected].owner_name}</h2>
							<div className="mb-4 text-lg"><span className="font-semibold">Bank:</span> {accounts[selected].bank?.name}</div>
							<div className="mb-4 text-lg"><span className="font-semibold">Current Balance:</span> £{(parseFloat(accounts[selected].balance) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
			</main>
			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
		</div>
	);
}
