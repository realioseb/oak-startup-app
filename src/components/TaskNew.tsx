import { useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/task-context';

const TaskInput = styled.input`
  margin-top: 5px;
  border: none;
  background-color: #f1f1f1;
  height: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  display: block;
`;

export const TaskNew = ({ phaseId }: { phaseId: number }) => {
  const { handleTaskInsert } = useContext(TaskContext);

  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <TaskInput
      placeholder="Add new task"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (!text) {
            alert('Task name is required');
            return;
          }

          setDisabled(true);
          handleTaskInsert(text, phaseId)
            .then(() => setText(''))
            .finally(() => setDisabled(false));
        }
      }}
      disabled={disabled}
    />
  );
};
