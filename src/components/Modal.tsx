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

export const Modal = ({ handleSubmit, handleCancel }: ModalProps) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h4>Are you sure to delete?</h4>
        <span>All subtasks will be removed too</span>
        <div style={{ marginTop: '35px' }}>
          <button onClick={handleSubmit} type="button">
            Confirm
          </button>
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

type ModalProps = {
  handleSubmit: React.MouseEventHandler;
  handleCancel: React.MouseEventHandler;
};
