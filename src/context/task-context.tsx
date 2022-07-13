import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api, getRandomFact } from '../api';
import { ITask } from '../types';

interface ITaskContext {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  editTask: ITask | null;
  setEditTask: (task: ITask | null) => void;
  removeTask: ITask | null;
  setRemoveTask: (task: ITask | null) => void;
  handleTaskInsert: (name: string, phaseId: number) => Promise<ITask>;
  handleTaskUpdate: (name: string) => Promise<ITask | undefined>;
  handleTaskRemove: (id: number) => Promise<ITask>;
  handleTaskComplete: (id: number) => Promise<ITask>;
  handleTaskIncomplete: (id: number) => Promise<ITask>;
  lastOngoing: number;
}

export const TaskContext = createContext<ITaskContext>({
  tasks: [],
  setTasks: () => {},
  editTask: null,
  setEditTask: () => {},
  removeTask: null,
  setRemoveTask: () => {},
  handleTaskInsert: async () => ({} as any),
  handleTaskUpdate: async () => ({} as any),
  handleTaskRemove: async () => ({} as any),
  handleTaskComplete: async () => ({} as any),
  handleTaskIncomplete: async () => ({} as any),
  lastOngoing: 0,
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editTask, setEditTask] = useState<ITask | null>(null);
  const [removeTask, setRemoveTask] = useState<ITask | null>(null);

  useEffect(() => {
    api
      .taskList()
      .then((items) => {
        setTasks(items);
      })
      .catch((err) => {
        setTasks([]);
      });
  }, []);

  const handleTaskInsert = useCallback(
    async (name: string, phaseId: number) => {
      if (!name) {
        throw new Error('name-required');
      }

      const task = await api.taskInsert(name, phaseId);
      setTasks((tasks) => [...tasks, task]);
      return task;
    },
    [],
  );

  const handleTaskUpdate = useCallback(
    async (name: string) => {
      if (!name) {
        throw new Error('name-required');
      }

      if (editTask) {
        const taskUpdated = await api.taskUpdate(editTask.id, name);

        setTasks((tasks) => {
          const taskIndex = tasks.findIndex(
            (task) => task.id === taskUpdated.id,
          );

          if (taskIndex !== -1) {
            tasks[taskIndex] = taskUpdated;
          }

          return [...tasks];
        });

        return taskUpdated;
      }
    },
    [editTask],
  );

  const handleTaskRemove = useCallback((id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    return api.taskRemove(id);
  }, []);

  const handleTaskComplete = useCallback(
    async (id: number) => {
      const completedTask = await api.taskComplete(id);

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        tasks[taskIndex] = completedTask;
      }

      setTasks([...tasks]);

      if (tasks.reduce((res, task) => res && task.isComplete, true)) {
        // TODO: use beautiful modal instead of the alert
        getRandomFact().then((fact) => alert(fact.text));
      }

      return completedTask;
    },
    [tasks],
  );

  const handleTaskIncomplete = useCallback(async (id: number) => {
    const incompletedTask = await api.taskIncomplete(id);

    setTasks((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        tasks[taskIndex] = incompletedTask;
      }

      return [...tasks];
    });

    return incompletedTask;
  }, []);

  const lastOngoing = useMemo(() => {
    const phaseTasks = tasks.reduce<{ [phaseId: number]: ITask[] }>(
      (acc, item) => {
        if (!acc[item.phaseId]) {
          acc[item.phaseId] = [];
        }

        acc[item.phaseId].push(item);

        return acc;
      },
      {},
    );

    const sortedPhaseTasks = Object.entries(phaseTasks).sort(
      ([phaseId], [nextPhaseId]) => parseInt(phaseId) - parseInt(nextPhaseId),
    );

    let lastPhaseId = -1;
    for (let [phaseId, tasks] of sortedPhaseTasks) {
      lastPhaseId = parseInt(phaseId);
      for (let task of tasks) {
        if (!task.isComplete) {
          return task.phaseId;
        }
      }
    }

    return lastPhaseId;
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      setTasks,
      editTask,
      setEditTask,
      removeTask,
      setRemoveTask,
      handleTaskInsert,
      handleTaskUpdate,
      handleTaskRemove,
      handleTaskComplete,
      handleTaskIncomplete,
      lastOngoing,
    }),
    [
      tasks,
      editTask,
      removeTask,
      handleTaskInsert,
      handleTaskUpdate,
      handleTaskRemove,
      handleTaskComplete,
      handleTaskIncomplete,
      lastOngoing,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
