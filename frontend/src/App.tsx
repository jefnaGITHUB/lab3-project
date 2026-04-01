import { useEffect, useState } from "react";

interface Health {
  service: string;
  status: string;
}

interface Message {
  message: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchHealth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/health`);
      const data: Health = await res.json();
      setHealth(data);
    } catch {
      setHealth(null);
    }
  };

  const getRandomMsg = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/message`);
      const data: Message = await res.json();
      setMessage(data);
    } catch {
      setError("Could not reach backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-4">
            lab3-project
          </h1>
          <button
            onClick={getRandomMsg}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2 px-4 rounded-lg transition-colors hover:cursor-pointer"
          >
            {loading ? "Loading..." : "Get Message"}
          </button>
        </div>

        {error && (
          <div className="bg-slate-800 border border-red-500 rounded-2xl p-4">
            <p className="text-sm font-medium text-red-400">Error</p>
            <p className="text-sm text-slate-300 mt-1">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-slate-800 border border-blue-800 rounded-2xl p-4">
            <p className="text-slate-200">{message.message}</p>
          </div>
        )}

        {health && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-3">
              Health Check
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Service</span>
                <span className="text-slate-200 font-medium">
                  {health.service}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status</span>
                <span className="text-green-400 font-medium">
                  {health.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
