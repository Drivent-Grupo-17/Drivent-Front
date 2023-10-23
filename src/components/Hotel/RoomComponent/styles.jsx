import styled from 'styled-components';

export const Container = styled.button`
  width: 190px;
  height: 45px;

  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cecece;
  background: ${({ isFull }) => (isFull === true ? '#E9E9E9' : '#FFF')};

  cursor: ${({isFull}) => isFull === true ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
