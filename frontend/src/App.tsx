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

  const API_URL = process.env.API_URL || "";

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
    <>
      <div>
        <button onClick={getRandomMsg} disabled={loading}>
          {loading ? "Loading msg..." : "Get Message"}
        </button>
      </div>

      {error && (
        <div>
          <span>Error</span>
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div>
          <p>{message.message}</p>
        </div>
      )}

      {health && (
        <div>
          <span>Health Check</span>
          <div>
            <div>
              <span>service</span>
              <span>{health.service}</span>
            </div>
            <div>
              <span>status</span>
              <span>{health.status}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
