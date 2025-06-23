"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const accounts = [
	{ name: "Lloyds" },
	{ name: "American Express" },
	{ name: "Chase" },
	{ name: "Monzo" },
	{ name: "Revolut" },
];

export default function DashboardPage() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const carouselRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// Carousel scroll handler (faster)
	function scrollCarousel(direction: "left" | "right") {
		if (!carouselRef.current) return;
		const width = carouselRef.current.offsetWidth;
		if (direction === "left") {
			carouselRef.current.scrollBy({ left: -width, behavior: "smooth" });
		} else {
			carouselRef.current.scrollBy({ left: width, behavior: "smooth" });
		}
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
					<Link href="/settings" className={`${theme.text}/90 hover:${theme.text} font-medium py-2 px-3 rounded transition-colors bg-black/0 hover:bg-black/10`}>
						Settings
					</Link>
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
				<h1 className={`text-4xl font-bold mb-6 mt-2 tracking-tight ${theme.text}`}>CoinPilot</h1>
				<p className={`text-center max-w-xl mb-8 ${theme.text === "text-white" ? "text-gray-300" : "text-gray-500"}`}>
					Welcome to your dashboard. Here you can view your connected bank accounts and manage your finances in one place.
				</p>
				<div className="relative w-full max-w-3xl flex items-center">
					<button
						aria-label="Scroll left"
						onClick={() => scrollCarousel("left")}
						className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full absolute left-0 z-10 shadow-md ${theme.arrow}`}
						style={{ top: "50%", transform: "translateY(-50%)" }}
					>
						&#8592;
					</button>
					<div
						ref={carouselRef}
						onWheel={handleWheel}
						className="flex gap-8 overflow-x-auto no-scrollbar py-4 px-2 w-full"
						style={{ scrollSnapType: "x mandatory" }}
					>
						{accounts.map((acc, i) => (
							<div
								key={acc.name + i}
								className={`min-w-[260px] h-36 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-semibold transition-colors duration-300 ${theme.card(i)}`}
								style={{ scrollSnapAlign: "center" }}
							>
								{acc.name}
							</div>
						))}
					</div>
					<button
						aria-label="Scroll right"
						onClick={() => scrollCarousel("right")}
						className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full absolute right-0 z-10 shadow-md ${theme.arrow}`}
						style={{ top: "50%", transform: "translateY(-50%)" }}
					>
						&#8594;
					</button>
				</div>
				{/* Dark/Light mode toggle button */}
				<button
					onClick={() => setDarkMode((d) => !d)}
					className={`fixed bottom-6 right-6 px-4 py-2 rounded shadow-lg border transition-colors duration-300 ${theme.button}`}
				>
					{darkMode ? "Light Mode" : "Dark Mode"}
				</button>
				<style jsx global>{`
					.no-scrollbar::-webkit-scrollbar {
						display: none;
					}
					.no-scrollbar {
						-ms-overflow-style: none;
						scrollbar-width: none;
					}
				`}</style>
			</main>
		</div>
	);
}
