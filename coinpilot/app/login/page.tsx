"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSliding, setIsSliding] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts")
      .then(res => res.json())
      .then(setApiData)
      .catch(() => setApiData({ error: "Failed to fetch" }));
  }, []);

=======
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "test@example.com" && password === "password") {
      setIsSliding(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700); // match animation duration
    } else {
      setMessage("Invalid credentials. Try test@example.com / password");
    }
  }

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-black transition-transform duration-700 ${
        isSliding ? "-translate-x-full" : ""
      }`}
      style={{ willChange: "transform" }}
    >
      <div>
        <pre className="text-xs text-white bg-gray-900 p-2 rounded max-w-md overflow-x-auto">
          {apiData ? JSON.stringify(apiData, null, 2) : "Loading..."}
        </pre>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded text-black bg-white" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 border rounded text-black bg-white" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800">Sign In</button>
        </form>
        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
        <div className="text-xs text-gray-400 text-center mt-4">Demo: test@example.com / password</div>
      </div>
    </main>
  );
}
