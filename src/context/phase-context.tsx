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
  setPhases: React.Dispatch<React.SetStateAction<IPhase[]>>;
  editPhase: IPhase | null;
  setEditPhase: React.Dispatch<React.SetStateAction<IPhase | null>>;
  removePhase: IPhase | null;
  setRemovePhase: React.Dispatch<React.SetStateAction<IPhase | null>>;
  handlePhaseInsert: (name: string) => Promise<IPhase>;
  handlePhaseUpdate: (name: string) => Promise<IPhase | undefined>;
  handlePhaseRemove: (id: number) => Promise<void>;
}

export const PhaseContext = createContext<IPhaseContext>({
  phases: [],
  setPhases: () => {},
  editPhase: null,
  setEditPhase: () => {},
  removePhase: null,
  setRemovePhase: () => {},
  handlePhaseInsert: async () => ({} as any),
  handlePhaseUpdate: async () => ({} as any),
  handlePhaseRemove: async () => {},
});

export const PhaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phases, setPhases] = useState<IPhase[]>([]);
  const [editPhase, setEditPhase] = useState<IPhase | null>(null);
  const [removePhase, setRemovePhase] = useState<IPhase | null>(null);

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

  const handlePhaseInsert = useCallback(async (name: string) => {
    const newPhase = await api.phaseInsert(name);
    setPhases((current) => {
      const last = current[current.length - 1];
      if (last) {
        last.nextPhaseId = newPhase.id;
        newPhase.prevPhaseId = last.id;
      }
      return [...current, newPhase];
    });
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

  const handlePhaseRemove = useCallback(async (id: number) => {
    const removedPhase = await api.phaseRemove(id);

    setPhases((current) => {
      const { prevPhase, nextPhase } = Object.values(current).reduce<{
        prevPhase?: IPhase;
        nextPhase?: IPhase;
      }>((acc, item) => {
        if (item.id === removedPhase.prevPhaseId) {
          acc.prevPhase = item;
        }

        if (item.id === removedPhase.nextPhaseId) {
          acc.nextPhase = item;
        }

        return acc;
      }, {});

      if (prevPhase && nextPhase) {
        prevPhase.nextPhaseId = nextPhase.id;
        nextPhase.prevPhaseId = prevPhase.id;
      } else if (prevPhase) {
        delete prevPhase.nextPhaseId;
      } else if (nextPhase) {
        delete nextPhase.prevPhaseId;
      }
      return current.filter((phase) => phase.id !== id);
    });
  }, []);

  const value = useMemo(
    () => ({
      phases,
      setPhases,
      editPhase,
      setEditPhase,
      removePhase,
      setRemovePhase,
      handlePhaseInsert,
      handlePhaseUpdate,
      handlePhaseRemove,
    }),
    [
      phases,
      editPhase,
      removePhase,
      handlePhaseInsert,
      handlePhaseUpdate,
      handlePhaseRemove,
    ],
  );

  return (
    <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>
  );
};
