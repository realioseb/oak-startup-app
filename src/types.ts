export type IPhase = {
  id: number;
  name: string;
  isComplete: boolean;
  tasks: ITask[];
};

export type ITask = {
  id: number;
  name: string;
  isComplete: boolean;
  phaseId: number;
};
