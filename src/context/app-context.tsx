import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../api';
import { IPhase, ITask } from '../types';

interface IAppContext {
  phases: IPhase[];
  editPhase: IPhase | null;
  setEditPhase: (phase: IPhase | null) => void;
  editTask: ITask | null;
  setEditTask: (task: ITask | null) => void;
  removePhase: IPhase | null;
  setRemovePhase: (phase: IPhase | null) => void;
  handlePhaseInsert: (name: string) => Promise<IPhase>;
  handlePhaseUpdate: (name: string) => Promise<IPhase | undefined>;
  handlePhaseDelete: (id: number) => Promise<void>;
}

export const AppContext = createContext<IAppContext>({
  phases: [],
  editPhase: null,
  setEditPhase: () => {},
  editTask: null,
  setEditTask: () => {},
  removePhase: null,
  setRemovePhase: () => {},
  handlePhaseInsert: async () => ({} as any),
  handlePhaseUpdate: async () => ({} as any),
  handlePhaseDelete: async () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
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

  const [editTask, setEditTask] = useState<ITask | null>(null);

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
      editTask,
      setEditTask,
    }),
    [
      phases,
      editPhase,
      removePhase,
      handlePhaseInsert,
      handlePhaseUpdate,
      handlePhaseDelete,
      editTask,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
