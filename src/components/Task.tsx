import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../context/task-context';
import { ITask } from '../types';
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TaskNameInput = styled.input`
  border: 1px solid #d5d5d5;
  background-color: white;
  padding: 3px 6px;
  border-radius: 5px;
  display: block;
`;

export const Task = ({ task, disabled }: TaskProps) => {
  const {
    editTask,
    setEditTask,
    setRemoveTask,
    handleTaskUpdate,
    handleTaskComplete,
    handleTaskIncomplete,
  } = useContext(TaskContext);

  const [text, setText] = useState(task.name);

  const handleTaskToggle = useCallback(
    () =>
      task.isComplete
        ? handleTaskIncomplete(task.id)
        : handleTaskComplete(task.id),
    [task.id, task.isComplete, handleTaskComplete, handleTaskIncomplete],
  );

  return (
    <TaskContainer>
      <input
        checked={task.isComplete}
        onChange={handleTaskToggle}
        type="checkbox"
        disabled={disabled}
      />
      {editTask && editTask.id === task.id ? (
        <TaskNameInput
          autoFocus
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTaskUpdate(text).then(() => setEditTask(null));
            }

            if (e.key === 'Escape') {
              setEditTask(null);
              setText(task.name);
            }
          }}
          onBlur={() => setEditTask(null)}
        />
      ) : (
        <TaskName title={task.name}>{task.name}</TaskName>
      )}
      <HoverActions
        onEditClick={() => setEditTask(task)}
        onDeleteClick={() => setRemoveTask(task)}
      />
    </TaskContainer>
  );
};

type TaskProps = {
  task: ITask;
  disabled: boolean;
};
