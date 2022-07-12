export type IPhase = {
  id: number;
  name: string;
  isComplete: boolean;
  tasks: ITask[];
  prevPhaseId?: number;
  nextPhaseId?: number;
};

export type ITask = {
  id: number;
  name: string;
  isComplete: boolean;
  phaseId: number;
};
