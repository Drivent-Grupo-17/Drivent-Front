import styled from "styled-components";

export const Container = styled.button`
  width: 190px;
  height: 45px;

  padding: 10px;
  border-radius: 10px;
  border: 1px solid #CECECE;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isfull, selected }) => isfull === 'true' ? '#e0e0e0' : selected ? '#FFEED2' : 'transparent'};
  color: ${({ isfull }) => isfull === 'true' ? '#8B8B8B' : '#454545'};

  svg{
  font-size:27px;
}

&:hover{
  border: 2px solid pink;
}
&:disabled{
  cursor: not-allowed;
}

.selected {
      color: #FF4791 !important;
   }

/* .reserved {
      color: black !important;
   } */
`;


