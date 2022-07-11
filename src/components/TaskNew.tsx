import styled from 'styled-components';

const TaskInput = styled.input`
  margin-top: 5px;
  border: none;
  background-color: #f1f1f1;
  height: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  display: block;
`;

export const TaskNew = () => <TaskInput placeholder="Add new task" />;
