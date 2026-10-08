import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    async function checkHealth() {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (!response.ok){
          throw new Error(`API responded with status ${response.status}`);
        }
        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setError('Could not reach the API: ${err.message}');
      } finally {
        setLoading(false);
      }
    }

    checkHealth();
  }, []);

  return (
    <main>
      <h1>Pipeline Health Dashboard</h1>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      {health && <p>API status: {health.status}</p>}
    </main>
    
  );
}

export default App
