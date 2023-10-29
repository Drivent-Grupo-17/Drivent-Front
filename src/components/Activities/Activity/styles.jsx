import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export const ActivitieContainer = styled.div`
  width: 90%;
  height: 80px;
  background-color: ${({ color }) => (color ? color : '#F1F1F1')};
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
`;

export const ActivitieTitleContainer = styled.div`
  margin: 10px 10px;  
`;
export const ActivitieTitle = styled.div``;
export const ActivitieSubTitle = styled.div``;
export const ButtonContainer = styled.button`
  height: 60px;
  margin: auto 0;

  background: inherit;
  border: none;
  border-left: 1px solid #cfcfcf;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  cursor: ${({disabled}) => disabled === false ? 'pointer' : 'default'};

  img {
    margin: 0 20px;
  }

  p {
    color: ${({ color }) => (color ? color : 'green')};
    font-size: 10px;
    margin-top: 5px;
  }
`;

export const StyledClose = styled(AiOutlineCheckCircle)`
  color: green;
  font-size: 18px;
  margin: 0 20px;
`;
