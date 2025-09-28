"use client";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = Object.values(cryptos).filter((crypto) => crypto.s.toLowerCase().includes(search.toLowerCase()));

  // useEffect(() => {
  //   console.log(search);
  //   console.log(Object.values(cryptos));
  // }, [search]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=!ticker@arr");

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const cryptosArray = response.data; // array de cripto

      setCryptos((prev) => {
        const updated = { ...prev };
        cryptosArray.forEach((crypto) => {
          if (crypto.s.endsWith("USDT")) {
            // filtrás solo USDT
            updated[crypto.s] = crypto;
          }
        });
        return updated;
      });
    };

    return () => ws.close();
  }, []);

  const navigate = (route, id, e) => {
    e.stopPropagation();
    router.push(id ? `${route}/${id}` : `${route}`);
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="flex justify-center my-5 max-w-full">
        <label className="input w-1/2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Buscar Crypto" onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>
      <main className="min-h-screen min-w-full p-4">
        <div className="overflow-x-auto">
          <table className="table min-w-[900px]">
            <thead>
              <tr>
                <th className="w-1/4">Index</th>

                <th className="w-1/4">Moneda</th>
                <th className="w-1/5">Precio (USDT)</th>
                <th className="w-1/5">PPP (USDT)</th>
                <th className="w-1/5">Cambio</th>
                <th className="w-1/5">Porcentaje de Cambio</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crypto, index) => (
                <tr key={crypto.s} onClick={(e) => navigate("/view", crypto.s.toString().toLowerCase(), e)}>
                  <td>{index + 1}</td>
                  <td>{crypto.s}</td>
                  <td>{crypto.c}</td>
                  <td>{crypto.w}</td>
                  <td>{crypto.p}</td>
                  <td>{crypto.P}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
