import styled from 'styled-components';
import { IPhase } from '../types';
import { PhaseHeader } from './PhaseHeader';
import { TaskList } from './TaskList';

const PhaseContainer = styled.div`
  margin-top: 20px;
`;

export const Phase = ({ order, phase }: PhaseProps) => {
  return (
    <PhaseContainer>
      <PhaseHeader
        order={order}
        name={phase.name}
        isComplete={phase.isComplete}
      />
      <TaskList tasks={phase.tasks} />
    </PhaseContainer>
  );
};

type PhaseProps = {
  order: number;
  phase: IPhase;
};
