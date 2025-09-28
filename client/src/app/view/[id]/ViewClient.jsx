"use client";
import { useEffect, useState } from "react";

export default function ViewClient({ id }) {
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${id}@ticker`);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response);

      setCrypto(response.data);
    };

    return () => ws.close();
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Page details</legend>

        <input type="text" className="input" value={crypto?.s ?? "Crypto"} disabled />

        <input type="text" className="input" value={crypto?.c ?? 0} disabled />

        <input type="text" className="input" placeholder="Name" disabled />
      </fieldset>
    </main>
  );
}
