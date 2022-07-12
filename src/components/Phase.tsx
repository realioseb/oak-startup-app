import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/task-context';
import { IPhase } from '../types';
import { PhaseHeader } from './PhaseHeader';
import { TaskList } from './TaskList';

const PhaseContainer = styled.div`
  margin-top: 20px;
`;

export const Phase = ({ order, phase }: PhaseProps) => {
  const { tasks, lastOngoing } = useContext(TaskContext);

  const ownTasks = useMemo(
    () => tasks.filter((item) => item.phaseId === phase.id),
    [tasks, phase.id],
  );

  return (
    <PhaseContainer>
      <PhaseHeader order={order} phase={phase} />
      <TaskList
        phaseId={phase.id}
        tasks={ownTasks}
        disabled={lastOngoing < phase.id}
      />
    </PhaseContainer>
  );
};

type PhaseProps = {
  order: number;
  phase: IPhase;
};
