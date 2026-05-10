import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export function useApi() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/api/summary`, {
          timeout: 5000,
        });
        setSummary(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to connect to backend');
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { summary, loading, error };
}
