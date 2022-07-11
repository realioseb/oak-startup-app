import { IPhase, ITask } from '../types';

export interface IProvider {
  phaseList(): Promise<IPhase[]>;
  phaseInsert(name: string): Promise<IPhase>;
  phaseUpdate(id: number, name: string): Promise<IPhase>;
  phaseRemove(id: number): Promise<IPhase>;

  taskList(): Promise<ITask[]>;
  taskInsert(name: string, phaseId: number): Promise<ITask>;
  taskUpdate(id: number, name: string): Promise<ITask>;
  taskRemove(id: number): Promise<ITask>;
  taskComplete(id: number): Promise<ITask>;
  taskIncomplete(id: number): Promise<ITask>;
}
