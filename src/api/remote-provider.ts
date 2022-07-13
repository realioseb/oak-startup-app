import { IProvider } from './provider-interface';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { IPhase, ITask } from '../types';
import {
  phaseListQuery,
  phaseInsertMutation,
  phaseUpdateMutation,
  phaseRemoveMutation,
  taskListQuery,
  taskInsertMutation,
  taskUpdatetMutation,
  taskRemoveMutation,
  taskCompleteMutation,
  taskIncompleteMutation,
} from './gql';

type PhaseGQL = {
  id: number;
  isComplete: boolean;
  name: string;
};

type TaskGQL = {
  id: number;
  isComplete: boolean;
  name: string;
  phase: {
    id: number;
  };
};

export class RemoteProvider implements IProvider {
  private readonly gqlUri =
    process.env.REACT_APP_REMOTE_API || 'http://localhost:8000';
  private readonly client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.client = new ApolloClient({
      uri: this.gqlUri,
      cache: new InMemoryCache(),
    });
  }

  private taskConvert(task: TaskGQL): ITask {
    return {
      id: task.id,
      name: task.name,
      isComplete: task.isComplete,
      phaseId: task.phase.id,
    };
  }

  async phaseList(): Promise<IPhase[]> {
    const { data } = await this.client.query({
      query: phaseListQuery,
    });

    const phases = data.findPhases as PhaseGQL[];

    let prevPhase: IPhase | null = null;

    return phases.map((item) => {
      const phase: IPhase = Object.assign({}, item);

      if (prevPhase) {
        prevPhase.nextPhaseId = item.id;
        phase.prevPhaseId = prevPhase.id;
      }

      prevPhase = phase;

      return phase;
    });
  }

  async phaseInsert(name: string): Promise<IPhase> {
    const { data } = await this.client.mutate({
      mutation: phaseInsertMutation,
      variables: { name },
    });

    return Object.assign({}, data.insertPhase) as IPhase;
  }

  async phaseUpdate(id: number, name: string): Promise<IPhase> {
    const { data } = await this.client.mutate({
      mutation: phaseUpdateMutation,
      variables: { id, name },
    });

    return Object.assign({}, data.updatePhase) as IPhase;
  }

  async phaseRemove(id: number): Promise<IPhase> {
    const { data } = await this.client.mutate({
      mutation: phaseRemoveMutation,
      variables: { id },
    });

    return Object.assign({}, data.removePhase) as IPhase;
  }

  async taskList(): Promise<ITask[]> {
    const { data } = await this.client.query({
      query: taskListQuery,
    });

    return data.findTasks.map((task: TaskGQL) => this.taskConvert(task));
  }

  async taskInsert(name: string, phaseId: number): Promise<ITask> {
    const { data } = await this.client.mutate({
      mutation: taskInsertMutation,
      variables: { name, phaseId },
    });

    return this.taskConvert(data.insertTask);
  }

  async taskUpdate(id: number, name: string): Promise<ITask> {
    const { data } = await this.client.mutate({
      mutation: taskUpdatetMutation,
      variables: { id, name },
    });

    return this.taskConvert(data.updateTask);
  }

  async taskRemove(id: number): Promise<ITask> {
    const { data } = await this.client.mutate({
      mutation: taskRemoveMutation,
      variables: { id },
    });

    return this.taskConvert(data.removeTask);
  }

  async taskComplete(id: number): Promise<ITask> {
    const { data } = await this.client.mutate({
      mutation: taskCompleteMutation,
      variables: { id },
    });

    return this.taskConvert(data.completeTask);
  }

  async taskIncomplete(id: number): Promise<ITask> {
    const { data } = await this.client.mutate({
      mutation: taskIncompleteMutation,
      variables: { id },
    });

    return this.taskConvert(data.incompleteTask);
  }
}
