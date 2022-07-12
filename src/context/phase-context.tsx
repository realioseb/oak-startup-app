import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../api';
import { IPhase } from '../types';

interface IPhaseContext {
  phases: IPhase[];
  editPhase: IPhase | null;
  setEditPhase: (phase: IPhase | null) => void;
  removePhase: IPhase | null;
  setRemovePhase: (phase: IPhase | null) => void;
  handlePhaseInsert: (name: string) => Promise<IPhase>;
  handlePhaseUpdate: (name: string) => Promise<IPhase | undefined>;
  handlePhaseDelete: (id: number) => Promise<void>;
}

export const PhaseContext = createContext<IPhaseContext>({
  phases: [],
  editPhase: null,
  setEditPhase: () => {},
  removePhase: null,
  setRemovePhase: () => {},
  handlePhaseInsert: async () => ({} as any),
  handlePhaseUpdate: async () => ({} as any),
  handlePhaseDelete: async () => {},
});

export const PhaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phases, setPhases] = useState<IPhase[]>([]);

  useEffect(() => {
    api
      .phaseList()
      .then((items) => {
        setPhases(items);
      })
      .catch((err) => {
        setPhases([]);
      });
  }, []);

  const [editPhase, setEditPhase] = useState<IPhase | null>(null);
  const [removePhase, setRemovePhase] = useState<IPhase | null>(null);

  const handlePhaseInsert = useCallback(async (name: string) => {
    const newPhase = await api.phaseInsert(name);
    setPhases((current) => [...current, newPhase]);
    return newPhase;
  }, []);

  const handlePhaseUpdate = useCallback(
    async (name: string) => {
      if (editPhase) {
        const phaseUpdated = await api.phaseUpdate(editPhase.id, name);
        setPhases((phases) => {
          const phaseIndex = phases.findIndex(
            (phase) => phase.id === editPhase.id,
          );
          phases[phaseIndex] = phaseUpdated;
          return [...phases];
        });

        return phaseUpdated;
      }
    },
    [editPhase],
  );

  const handlePhaseDelete = useCallback(async (id: number) => {
    await api.phaseRemove(id);
    setPhases((current) => current.filter((phase) => phase.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      phases,
      editPhase,
      setEditPhase,
      removePhase,
      setRemovePhase,
      handlePhaseInsert,
      handlePhaseUpdate,
      handlePhaseDelete,
    }),
    [
      phases,
      editPhase,
      removePhase,
      handlePhaseInsert,
      handlePhaseUpdate,
      handlePhaseDelete,
    ],
  );

  return (
    <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>
  );
};
