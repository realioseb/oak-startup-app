import styled from 'styled-components';
import CheckIcon from '../assets/check.png';
import { usePhaseRemove } from '../hooks/use-phase-remove';
import { HoverActions } from './HoverActions';

const PhaseContainer = styled.div`
  display: flex;
  height: 30px;
  padding: 10px;
  :hover {
    background-color: #f1f1f1;
    > .hover-actions {
      display: flex;
    }
  }
`;

const PhaseIndex = styled.div`
  background-color: black;
  color: white;
  width: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 15px;
`;

const PhaseName = styled.div`
  line-height: 30px;
  font-weight: bold;
  font-size: 24px;
`;

const PhaseComplete = styled.div<{ isComplete: boolean }>`
  height: 100%;
  width: 30px;
  background-image: url(${CheckIcon});
  background-position: center;
  background-size: 100%;
  margin: 0 15px;
  display: ${({ isComplete }) => (isComplete ? 'flex' : 'none')};
`;

export const PhaseHeader = ({ order, name, isComplete }: PhaseHeaderProps) => {
  return (
    <PhaseContainer>
      <PhaseIndex>{order}</PhaseIndex>
      <PhaseName>{name}</PhaseName>
      <PhaseComplete isComplete={isComplete} />
      <HoverActions />
    </PhaseContainer>
  );
};

type PhaseHeaderProps = {
  order: number;
  name: string;
  isComplete: boolean;
};
