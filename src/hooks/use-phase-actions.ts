import { useCallback } from 'react';
import { api } from '../api';
import { IPhase } from '../types';

export const usePhaseActions = (phase: IPhase) => {
  const update = useCallback(
    (name: string) => {
      return api.phaseUpdate(phase.id, name);
    },
    [phase.id],
  );

  const remove = useCallback(() => {
    return api.phaseRemove(phase.id);
  }, [phase.id]);

  return {
    update,
    remove,
  };
};
