"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, ArrowLeft, Activity, DollarSign, BarChart3, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";

export default function ViewClient({ id = "btcusdt" }) {
  const [crypto, setCrypto] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${id}@ticker`);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setCrypto(response.data);

      setPriceHistory((prev) => {
        const newHistory = [...prev, { price: parseFloat(response.data.c), timestamp: Date.now() }];
        return newHistory.slice(-20);
      });
    };

    return () => ws.close();
  }, [id]);

  if (!crypto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const currentPrice = parseFloat(crypto.c);
  const priceChange = parseFloat(crypto.p);
  const percentChange = parseFloat(crypto.P);
  const isPositive = priceChange > 0;
  const highPrice = parseFloat(crypto.h);
  const lowPrice = parseFloat(crypto.l);
  const volume = parseFloat(crypto.v);
  const quoteVolume = parseFloat(crypto.q);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {crypto.s.substring(0, 2)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{crypto.s}</h1>
                  <p className="text-slate-400 text-sm">Binance</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl font-bold text-white font-mono">
                    ${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                  </span>
                  <div className="flex items-center gap-2">
                    {isPositive ? <TrendingUp className="w-6 h-6 text-green-400" /> : <TrendingDown className="w-6 h-6 text-red-400" />}
                    <span className={`text-2xl font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                      {isPositive ? "+" : ""}
                      {percentChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <p className={`text-lg font-mono ${isPositive ? "text-green-400" : "text-red-400"}`}>
                  {isPositive ? "+" : ""}${priceChange.toFixed(2)} hoy
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 text-slate-400 mb-4">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Evolución en tiempo real</span>
                  <span className="text-xs text-slate-500 ml-auto">Últimos 20 puntos</span>
                </div>
                <LineChart
                  width={700}
                  height={180}
                  data={priceHistory.map((point, index) => ({
                    index,
                    price: point.price,
                    time: new Date(point.timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
                  }))}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={10}
                    tickFormatter={(value, index) => (index % 5 === 0 ? value.split(":").slice(0, 2).join(":") : "")}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    domain={["dataMin - 0.01", "dataMax + 0.01"]}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                    labelStyle={{ color: "#94a3b8", fontSize: "12px" }}
                    formatter={(value) => [`$${parseFloat(value).toFixed(8)}`, "Precio"]}
                  />
                  <Area type="monotone" dataKey="price" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth={2} fill="url(#colorPrice)" />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: isPositive ? "#10b981" : "#ef4444" }}
                  />
                </LineChart>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-slate-400 font-medium">Máximo 24h</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">
                  ${highPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                </p>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-slate-400 font-medium">Mínimo 24h</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">
                  ${lowPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Estadísticas</h2>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-sm">Volumen 24h</span>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">{volume.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                </div>

                <div className="border-t border-slate-700/50 pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-sm">Volumen en USDT</span>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">${quoteVolume.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                </div>

                <div className="border-t border-slate-700/50 pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-sm">Precio Promedio</span>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">
                    ${parseFloat(crypto.w).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                  </p>
                </div>

                <div className="border-t border-slate-700/50 pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-sm">Última actualización</span>
                  </div>
                  <p className="text-lg font-bold text-white">{new Date(crypto.E).toLocaleTimeString("es-ES")}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-3">Rango de precios</h3>
              <div className="relative h-3 bg-slate-900/50 rounded-full overflow-hidden mb-3">
                <div
                  className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{
                    width: `${((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">${lowPrice.toFixed(2)}</span>
                <span className="text-white font-bold">${currentPrice.toFixed(2)}</span>
                <span className="text-slate-400">${highPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
