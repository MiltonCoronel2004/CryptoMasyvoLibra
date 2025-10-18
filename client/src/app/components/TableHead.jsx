export default function TableHead() {
  return (
    <thead>
      <tr className="bg-slate-800/50 border-b border-slate-700/50">
        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">#</th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Moneda</th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Precio</th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">PPP 24h</th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Cambio</th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">% Cambio</th>
      </tr>
    </thead>
  );
}
