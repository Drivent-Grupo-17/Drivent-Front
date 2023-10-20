import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { getHotels, getRoomsByHotelId } from '../../services/hotelsApi.js';
import { Container, HotelsContainer, RoomsContainer } from './styles';
import { HotelUnique } from './HotelComponent/index';
import Room from './RoomComponent';

export default function HotelComponent() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    hotelsList();
  }, []);

  async function hotelsList() {
    const response = await getHotels(userData.token);
    setHotels(response);
  }

  async function roomsList(hotelId) {
    const response = await getRoomsByHotelId(hotelId, userData.token);
    let array = [];
    array = response.Rooms.map((element) => {
      return { ...element };
    });
    setRooms(array);
  }
  console.log(rooms);
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Instruction>Primeiro, escolha seu hotel</Instruction>
      <Container>
        <HotelsContainer>
          {hotels.map((element) => {
            if (element.capacity - element.bookings === 0) {
            } else {
              return (
                <HotelUnique
                  key={element.id}
                  hotel={element}
                  selected={selected}
                  setSelected={setSelected}
                  roomsList={roomsList}
                />
              );
            }
          })}
        </HotelsContainer>
        {rooms.length !== 0 ? (
          <div>
            <Instruction>Ótima pedida! Agora escolha seu quarto:</Instruction>
            <RoomsContainer>
              {rooms.map((element) => (
                <Room key={element.id} room={element} />
              ))}
            </RoomsContainer>
          </div>
        ) : (
          ''
        )}
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
