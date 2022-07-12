import { useState } from 'react';
import styled from 'styled-components';

const PhaseInput = styled.input`
  margin-top: 15px;
  border: none;
  background-color: #f1f1f1;
  height: 25px;
  padding: 5px 15px;
  border-radius: 5px;
`;

export const PhaseNew = ({ onSubmit }: PhaseNewProps) => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <PhaseInput
      placeholder="Add new phase"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setDisabled(true);
          onSubmit(text)
            .then(() => setText(''))
            .finally(() => setDisabled(false));
        }
      }}
      disabled={disabled}
    />
  );
};

type PhaseNewProps = {
  onSubmit: (name: string) => Promise<any>;
};
