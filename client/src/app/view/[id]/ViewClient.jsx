"use client";
import { useEffect, useState } from "react";

export default function ViewClient({ id }) {
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${id}@ticker`);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setCrypto()
    };

    return () => ws.close();
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Page details</legend>

        <label className="label">Title</label>
        <input type="text" className="input" placeholder="My awesome page" />

        <label className="label">Slug</label>
        <input type="text" className="input" placeholder="my-awesome-page" />

        <label className="label">Author</label>
        <input type="text" className="input" placeholder="Name" />
      </fieldset>
    </main>
  );
}
