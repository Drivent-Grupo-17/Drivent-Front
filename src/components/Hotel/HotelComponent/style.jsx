import styled from 'styled-components';

export const Container = styled.div`
  width: 196px;
  height: 264px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;

  border-radius: 10px;
  background: ${({ selected }) => (selected === true ? '#FFEED2' : '#EBEBEB')};

  img {
    width: 168px;
    border-radius: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;
