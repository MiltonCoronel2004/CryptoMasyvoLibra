export default function Stats({ filtered }) {
  return (
    <div className="container mx-auto px-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="text-slate-400 text-sm">Total Monedas</div>
          <div className="text-2xl font-bold text-white mt-1">{filtered.length}</div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="text-slate-400 text-sm">En Alza</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{filtered.filter((c) => parseFloat(c.P) > 0).length}</div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="text-slate-400 text-sm">En Baja</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{filtered.filter((c) => parseFloat(c.P) < 0).length}</div>
        </div>
      </div>
    </div>
  );
}
