import { useState, useEffect } from 'react';
import { getAllTrucks, getAvailableTrucks, getTruckById, TruckData } from '../lib/firebaseStorage';

export function useTrucks() {
  const [trucks, setTrucks] = useState<TruckData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    try {
      setLoading(true);
      const data = await getAvailableTrucks();
      setTrucks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load trucks');
      console.error('Error loading trucks:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadTrucks();
  };

  return { trucks, loading, error, refresh };
}

export function useTruck(truckId: string) {
  const [truck, setTruck] = useState<TruckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTruck();
  }, [truckId]);

  const loadTruck = async () => {
    try {
      setLoading(true);
      const data = await getTruckById(truckId);
      setTruck(data);
      setError(null);
    } catch (err) {
      setError('Failed to load truck');
      console.error('Error loading truck:', err);
    } finally {
      setLoading(false);
    }
  };

  return { truck, loading, error };
}
