export type IPhase = {
  id: number;
  name: string;
  isComplete: boolean;
  prevPhaseId?: number;
  nextPhaseId?: number;
};

export type ITask = {
  id: number;
  name: string;
  isComplete: boolean;
  phaseId: number;
};
