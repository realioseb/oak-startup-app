import { IPhase, ITask } from '../types';
import { IProvider } from './provider-interface';

type PhaseSerialized = { [id: string]: IPhase };
type TaskSerialized = { [id: string]: ITask };

export class StorageProvider implements IProvider {
  private phaseKey = 'phase';
  private taskKey = 'task';
  private phaseLastIndex = parseInt(
    localStorage.getItem('phaseLastIndex') || '0',
  );
  private taskLastIndex = parseInt(
    localStorage.getItem('taskLastIndex') || '0',
  );

  private readPhases(): PhaseSerialized {
    const phasesEncoded = localStorage.getItem(this.phaseKey);

    if (!phasesEncoded) {
      return {};
    }

    const phases: PhaseSerialized = JSON.parse(phasesEncoded);

    const tasksEncoded = localStorage.getItem(this.taskKey);

    if (tasksEncoded) {
      const tasks: TaskSerialized = JSON.parse(tasksEncoded);

      for (let taskId in tasks) {
        const task = tasks[taskId];
        phases[task.phaseId].tasks.push(task);
      }
    }

    return phases;
  }

  private writePhases(phases: PhaseSerialized): void {
    localStorage.setItem(this.phaseKey, JSON.stringify(phases));
  }

  private readTasks(): TaskSerialized {
    const tasksEncoded = localStorage.getItem(this.taskKey);

    if (!tasksEncoded) {
      return {};
    }

    return JSON.parse(tasksEncoded) as TaskSerialized;
  }

  private writeTasks(tasks: TaskSerialized): void {
    localStorage.setItem(this.taskKey, JSON.stringify(tasks));
  }

  async phaseList(): Promise<IPhase[]> {
    const phases = this.readPhases();
    return Object.values(phases);
  }

  async phaseInsert(name: string): Promise<IPhase> {
    this.phaseLastIndex++;
    localStorage.setItem('phaseLastIndex', this.phaseLastIndex.toString());

    const phase: IPhase = {
      id: this.phaseLastIndex,
      name,
      isComplete: false,
      tasks: [],
    };

    const phases = this.readPhases();

    phases[phase.id] = phase;

    this.writePhases(phases);

    return phase;
  }

  async phaseUpdate(id: number, name: string): Promise<IPhase> {
    const phases = this.readPhases();

    if (!phases[id]) {
      throw new Error('phase-not-found');
    }

    phases[id].name = name;

    this.writePhases(phases);

    return phases[id];
  }

  async phaseRemove(id: number): Promise<IPhase> {
    const phases = this.readPhases();
    const removedPhase = phases[id];

    if (!removedPhase) {
      throw new Error('phase-not-found');
    }

    // TODO: remove tasks
    delete phases[id];

    return removedPhase;
  }

  async taskList(): Promise<ITask[]> {
    const tasks: TaskSerialized = this.readTasks();
    return Object.values(tasks);
  }

  async taskInsert(name: string, phaseId: number): Promise<ITask> {
    const phases = this.readPhases();

    if (!phases[phaseId]) {
      throw new Error('phase-not-found');
    }

    this.taskLastIndex++;
    localStorage.setItem('taskLastIndex', this.taskLastIndex.toString());

    const task: ITask = {
      id: this.taskLastIndex,
      name,
      isComplete: false,
      phaseId,
    };

    const tasks = this.readTasks();

    tasks[task.id] = task;

    this.writeTasks(tasks);

    return task;
  }

  async taskUpdate(id: number, name: string): Promise<ITask> {
    const tasks = this.readTasks();

    if (!tasks[id]) {
      throw new Error('task-not-found');
    }

    tasks[id].name = name;

    this.writeTasks(tasks);

    return [] as any;
  }

  async taskRemove(id: number): Promise<ITask> {
    const tasks = this.readTasks();
    const removedTask = tasks[id];

    if (!removedTask) {
      throw new Error('task-not-found');
    }

    delete tasks[id];

    this.writeTasks(tasks);

    return removedTask;
  }

  // TODO: validate task completion
  async taskComplete(id: number): Promise<ITask> {
    const tasks = this.readTasks();

    if (!tasks[id]) {
      throw new Error('task-not-found');
    }

    tasks[id].isComplete = true;

    return tasks[id];
  }

  async taskIncomplete(id: number): Promise<ITask> {
    const tasks = this.readTasks();

    if (!tasks[id]) {
      throw new Error('task-not-found');
    }

    tasks[id].isComplete = false;

    return tasks[id];
  }
}
