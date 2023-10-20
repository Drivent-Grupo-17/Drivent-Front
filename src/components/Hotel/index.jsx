import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { getHotels } from '../../services/hotelsApi.js';
import { Container, HotelsContainer } from './styles';
import { HotelUnique } from './HotelComponent/index';

export default function HotelComponent() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    hotelsList();
  }, []);
  console.log(hotels);

  async function hotelsList() {
    const response = await getHotels(userData.token);
    setHotels(response);
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Instruction>Primeiro, escolha seu hotel</Instruction>
      <Container>
        <HotelsContainer>
          {hotels.map((element) => {
            if (element.capacity - element.bookings === 0) {
            } else {
              return <HotelUnique hotel={element} selected={selected} setSelected={setSelected} />;
            }
          })}
        </HotelsContainer>
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
