import styled from 'styled-components';
import { ITask } from '../types';
import { Task } from './Task';
import { TaskNew } from './TaskNew';

const TaskListContainer = styled.div`
  margin-bottom: 10px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
`;

export const TaskList = ({ tasks, phaseId, disabled }: TaskListProps) => {
  return (
    <TaskListContainer>
      {tasks.map((task) => (
        <Task key={task.id} task={task} disabled={disabled} />
      ))}
      <TaskNew phaseId={phaseId} />
    </TaskListContainer>
  );
};

type TaskListProps = {
  tasks: ITask[];
  phaseId: number;
  disabled: boolean;
};
