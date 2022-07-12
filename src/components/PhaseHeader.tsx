import { useContext, useState } from 'react';
import styled from 'styled-components';
import CheckIcon from '../assets/check.png';
import { PhaseContext } from '../context/phase-context';
import { IPhase } from '../types';
import { HoverActions } from './HoverActions';

const PhaseContainer = styled.div`
  display: flex;
  height: 30px;
  padding: 10px;
  :hover {
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

const PhaseNameInput = styled.input`
  border: 1px solid #d5d5d5;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  display: block;
`;

export const PhaseHeader = ({ phase, order }: PhaseHeaderProps) => {
  const [text, setText] = useState(phase.name);
  const { editPhase, setEditPhase, handlePhaseUpdate, setRemovePhase } =
    useContext(PhaseContext);

  return (
    <PhaseContainer>
      <PhaseIndex>{order}</PhaseIndex>
      {editPhase && editPhase.id === phase.id ? (
        <PhaseNameInput
          autoFocus
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handlePhaseUpdate(text).then(() => setEditPhase(null));
            }

            if (e.key === 'Escape') {
              setEditPhase(null);
            }
          }}
          onBlur={() => setEditPhase(null)}
        />
      ) : (
        <PhaseName>{phase.name}</PhaseName>
      )}

      <PhaseComplete isComplete={phase.isComplete} />
      <HoverActions
        onEditClick={() => setEditPhase(phase)}
        onDeleteClick={() => setRemovePhase(phase)}
      />
    </PhaseContainer>
  );
};

type PhaseHeaderProps = {
  order: number;
  phase: IPhase;
};
