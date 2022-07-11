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

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <TaskListContainer>
      {tasks.map((task) => (
        <Task key={task.id} name={task.name} isComplete={task.isComplete} />
      ))}
      <TaskNew />
    </TaskListContainer>
  );
};

type TaskListProps = {
  tasks: ITask[];
};
