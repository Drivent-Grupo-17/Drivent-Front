import styled from 'styled-components';

export const Container = styled.article`
  width: 131px;
  height: 37px;
  flex-shrink: 0;

  border-radius: 4px;
  background: ${({ selected }) => (selected ? '#FFD37D' : '#E0E0E0')};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
