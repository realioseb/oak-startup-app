import styled from 'styled-components';

const PhaseInput = styled.input`
  margin-top: 15px;
  border: none;
  background-color: #f1f1f1;
  height: 25px;
  padding: 5px 15px;
  border-radius: 5px;
`;

export const PhaseNew = () => <PhaseInput placeholder="Add new phase" />;
