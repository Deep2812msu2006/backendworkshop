import { useState, useEffect } from 'react';
import { resortsData } from '../data/resorts';

// TODO: Fetch Resorts from API
export function useResorts() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch delay
    const timer = setTimeout(() => {
      setResorts(resortsData);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { resorts, loading };
}
