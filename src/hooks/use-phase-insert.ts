import { useCallback, useState } from 'react';
import { api } from '../api';
import { IPhase } from '../types';

export const usePhaseInsert = (callback: Function) => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleInsert = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setDisabled(true);
        api.phaseInsert(value).then((newPhase) => {
          callback((current: IPhase[]) => {
            return [...current, newPhase];
          });

          setValue('');
          setDisabled(false);
        });
      }
    },
    [value, callback],
  );

  return {
    name: value,
    onChange: setValue,
    onKeyDown: handleInsert,
    disabled,
  };
};
