import styled from 'styled-components';

export const Container = styled.article`
  width: 196px;
  height: 264px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  border: none;
  border-radius: 10px;
  background: ${({ selected }) => (selected === true ? '#FFEED2' : '#EBEBEB')};

  img {
    width: 168px;
    border-radius: 5px;
  }
`;
