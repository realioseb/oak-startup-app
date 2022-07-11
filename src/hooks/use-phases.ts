import { useEffect, useState } from 'react';
import { IPhase } from '../types';
import { api } from '../api';

export const usePhases = () => {
  const [phases, setPhases] = useState<IPhase[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .phaseList()
      .then((items) => {
        setPhases(items);
        setError('');
      })
      .catch((err) => {
        setPhases([]);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    phases,
    setPhases,
    isLoading,
    error,
  };
};
