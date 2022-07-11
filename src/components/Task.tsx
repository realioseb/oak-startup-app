import styled from 'styled-components';
import { HoverActions } from './HoverActions';

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  :hover {
    background-color: #e2e8ff;
    > .hover-actions {
      display: flex;
    }
  }
`;

const TaskName = styled.div`
  line-height: 30px;
`;

export const Task = ({ name, isComplete }: TaskProps) => (
  <TaskContainer>
    <input checked={isComplete} onChange={() => false} type="checkbox" />
    <TaskName>{name}</TaskName>
    <HoverActions />
  </TaskContainer>
);

type TaskProps = {
  name: string;
  isComplete: boolean;
};
