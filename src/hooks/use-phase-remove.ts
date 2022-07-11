import { useCallback, useState } from 'react';
import { api } from '../api';
import { IPhase } from '../types';

export const usePhaseRemove = (phaseId: number, callback: Function) => {
  const [disabled, setDisabled] = useState(false);

  const handleDelete = useCallback(() => {
    setDisabled(true);

    api.phaseRemove(phaseId).then(() => {
      callback((current: IPhase[]) => {
        return current.filter((phase) => phase.id !== phaseId);
      });

      setDisabled(false);
    });
  }, [phaseId, callback]);

  return {
    handleDelete,
    disabled,
  };
};
