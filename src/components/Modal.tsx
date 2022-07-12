import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #0000003e;
`;

const ModalContent = styled.div`
  margin: 50px auto;
  padding: 25px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  min-width: 280px;
  max-width: 500px;
`;

const ModalButton = styled.button<{ white?: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  background-color: ${({ color }) => color};
  color: ${({ white }) => (white ? 'white' : 'black')};
  opacity: 0.8;
  padding: 5px 10px;
  margin: 0 10px;
  :hover {
    opacity: 1;
  }
`;

export const Modal = ({ handleSubmit, handleCancel }: ModalProps) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h4>Are you sure to delete?</h4>
        <span>All subtasks will be removed too</span>
        <div style={{ marginTop: '35px' }}>
          <ModalButton
            onClick={handleSubmit}
            type="button"
            color="#ff0000"
            white
          >
            Confirm
          </ModalButton>
          <ModalButton onClick={handleCancel} type="button" color="whitesmoke">
            Cancel
          </ModalButton>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

type ModalProps = {
  handleSubmit: React.MouseEventHandler;
  handleCancel: React.MouseEventHandler;
};
