import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Zap, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dataRes = await fetch('http://localhost:8000/api/wind-data');
      const metricsRes = await fetch('http://localhost:8000/api/metrics');
      
      if (!dataRes.ok || !metricsRes.ok) {
        throw new Error('Failed to connect to backend endpoints');
      }

      const jsonDat = await dataRes.json();
      const jsonMet = await metricsRes.json();

      setData(jsonDat.slice(0, 96));
      setMetrics(jsonMet);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Could not connect to FastAPI backend. Ensure backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-amber-400" /> UK Day-Ahead Wind Power Intelligence
          </h1>
          <p className="text-sm text-slate-400">Elexon BMRS National Wind Actuals vs. Forecasts (January 2026)</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-medium">
            Live Pilot Environment
          </span>
          <button onClick={fetchData} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-rose-950/40 border border-rose-800 p-4 rounded-xl mb-6 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Mean Absolute Error</div>
            <div className="text-2xl font-bold text-amber-400">{metrics.meanAbsoluteErrorMW} <span className="text-xs text-slate-400">MW</span></div>
            <div className="text-xs text-slate-400 mt-1">Normalized: {metrics.normalizedMAEPct}%</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Root Mean Square Error</div>
            <div className="text-2xl font-bold text-rose-400">{metrics.rootMeanSquareErrorMW} <span className="text-xs text-slate-400">MW</span></div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Mean Bias Error</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.meanBiasErrorMW} <span className="text-xs text-slate-400">MW</span></div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Avg Wind Generation</div>
            <div className="text-2xl font-bold text-emerald-400">{metrics.meanActualGenerationMW} <span className="text-xs text-slate-400">MW</span></div>
          </div>
        </div>
      )}

      {/* Main Chart */}
      <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-emerald-400" /> Day-Ahead Forecast vs. Actual Wind Generation (MW)
        </h2>
        <div className="h-80 w-full">
          {loading ? (
            <div className="flex h-full items-center justify-center text-slate-400">Loading Elexon BMRS streams...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="startTime" stroke="#94a3b8" tick={{fontSize: 11}} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="actualGeneration" name="Actual Generation (MW)" stroke="#34d399" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="forecastGeneration" name="Day-Ahead Forecast (MW)" stroke="#60a5fa" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-blue-950/30 border border-blue-800/40 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="text-blue-400 shrink-0 mt-1" size={20} />
        <div className="text-sm text-blue-200">
          <span className="font-semibold">Procurement Recommendation:</span> Quantified MAE indicates uncertainty bounds. Schedule thermal reserves proactively during forecast divergence peaks.
        </div>
      </div>
    </div>
  );
}