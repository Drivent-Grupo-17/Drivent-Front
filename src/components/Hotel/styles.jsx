import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  /* height: 90%; */

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const HotelsContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 19px;
`;

export const RoomsContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 8px 17px;
`;

export const ErrorContainer = styled.div`
  width: 80%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
