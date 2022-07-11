import styled from 'styled-components';
import DeleteIcon from '../assets/delete.jpeg';
import EditIcon from '../assets/edit.png';

const HoverContainer = styled.div`
  align-items: center;
  margin: 0 15px 0 auto;
  height: 100%;
  display: none;
  :hover {
    display: flex;
  }
`;

const IconButton = styled.button<{ src: string }>`
  cursor: pointer;
  background-color: unset;
  border: none;
  margin-left: 5px;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: 100%;
  height: 25px;
  width: 25px;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

export const HoverActions = () => (
  <HoverContainer className="hover-actions">
    <IconButton src={EditIcon} />
    <IconButton src={DeleteIcon} />
  </HoverContainer>
);
