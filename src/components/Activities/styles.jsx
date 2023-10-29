import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  /* height: 90%; */

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DaysContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 17px;
`;
export const TabbleContainer = styled.div`
width:100%;
height:392px;
display:flex;
margin-top:40px;
`
export const TabbleColumnsContainer = styled.div`
width:33%;
`
export const TableColumns = styled.div`
border:  1px solid #D7D7D7;
height:100%;
width:100;
border-left:${({borderoff})=> borderoff ? "inherit" : ""};
border-right:${({borderoff})=> borderoff ? "inherit" : ""};
display:flex;
flex-direction:column;
align-items:center;
`
export const TableColumnsTitle = styled.div`
  text-align:center;
  color:#7B7B7B;
  margin-bottom:10px;
`