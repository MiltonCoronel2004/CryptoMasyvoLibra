"use client";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Header from "./components/Header";
import Buscador from "./components/Buscador";
import Stats from "./components/Stats";
import TableHead from "./components/TableHead";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();
  const [cryptos, setCryptos] = useState({});
  const [search, setSearch] = useState("");

  const filtered = Object.values(cryptos).filter((crypto) => crypto.s.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=!ticker@arr");

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const cryptosArray = response.data;

      const updated = {};
      cryptosArray.forEach((crypto) => {
        if (crypto.s.endsWith("USDT")) {
          updated[crypto.s] = crypto;
        }
      });

      setCryptos(updated);
    };

    return () => ws.close();
  }, []);

  const navigate = (id) => {
    router.push(`/view/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header />

      {/* Buscador */}
      <Buscador search={search} setSearch={setSearch} />

      {/* Stats */}
      <Stats filtered={filtered} />

      {/* Tabla */}
      <main className="container mx-auto px-4 pb-8">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <TableHead />
              <tbody className="divide-y divide-slate-700/30">
                {filtered.map((crypto, index) => {
                  const isPositive = parseFloat(crypto.p) > 0;
                  const percentChange = parseFloat(crypto.P);

                  return (
                    <tr
                      key={crypto.s}
                      onClick={() => navigate(crypto.s.toLowerCase())}
                      className="hover:bg-slate-700/20 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 text-slate-400 text-sm font-medium">{index + 1}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {crypto.s.substring(0, 2)}
                          </div>
                          <span className="text-white font-semibold group-hover:text-blue-400 transition-colors">{crypto.s}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-white font-mono font-medium">
                          $
                          {parseFloat(crypto.c).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-slate-300 font-mono text-sm">
                          $
                          {parseFloat(crypto.w).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPositive ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                          <span className={`font-mono font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                            {isPositive ? "+" : ""}
                            {parseFloat(crypto.p).toFixed(2)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                            isPositive
                              ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30"
                              : "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {percentChange.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
