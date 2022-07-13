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

    return JSON.parse(phasesEncoded) as PhaseSerialized;
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

  private incrementIndex(key: 'phaseLastIndex' | 'taskLastIndex') {
    this[key]++;
    localStorage.setItem(key, this[key].toString());
    return this[key];
  }

  async phaseList(): Promise<IPhase[]> {
    const phases = this.readPhases();
    return Object.values(phases);
  }

  async phaseInsert(name: string): Promise<IPhase> {
    const phase: IPhase = {
      id: this.incrementIndex('phaseLastIndex'),
      name,
      isComplete: false,
    };

    const phases = this.readPhases();
    const prevPhase = Object.values(phases).find((item) => !item.nextPhaseId);

    if (prevPhase) {
      prevPhase.nextPhaseId = phase.id;
      phase.prevPhaseId = prevPhase.id;
    }

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

    const tasks = this.readTasks();

    for (let key in tasks) {
      if (tasks[key].phaseId === id) {
        delete tasks[key];
      }
    }

    const { prevPhase, nextPhase } = Object.values(phases).reduce<{
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

    this.writeTasks(tasks);
    this.writePhases(phases);

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

    const id = this.incrementIndex('taskLastIndex');

    const task: ITask = {
      id,
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

    const task = Object.assign({}, tasks[id], {
      name,
    });

    tasks[id] = task;

    this.writeTasks(tasks);

    return tasks[id];
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

  async taskComplete(id: number): Promise<ITask> {
    const tasks = this.readTasks();

    if (!tasks[id]) {
      throw new Error('task-not-found');
    }

    const phases = this.readPhases();
    const phase = phases[tasks[id].phaseId];

    if (!phase) {
      throw new Error('invalid-task-phase');
    }

    const prevPhase = Object.values(phases).find(
      (item) => item.id === phase.prevPhaseId,
    );

    if (
      prevPhase &&
      !Object.values(tasks)
        .filter((task) => task.phaseId === prevPhase.id)
        .reduce((acc, item) => acc && item.isComplete, true)
    ) {
      throw new Error('prev-phase-ongoing');
    }

    return this.taskToggle(id, true);
  }

  async taskIncomplete(id: number): Promise<ITask> {
    return this.taskToggle(id, false);
  }

  private taskToggle(id: number, isComplete: boolean) {
    const tasks = this.readTasks();

    if (!tasks[id]) {
      throw new Error('task-not-found');
    }

    const task = Object.assign({}, tasks[id], {
      isComplete,
    });

    tasks[id] = task;

    this.writeTasks(tasks);

    return tasks[id];
  }
}
