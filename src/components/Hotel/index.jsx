import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { getHotels, getRoomsByHotelId } from '../../services/hotelsApi.js';
import { Container, HotelsContainer, RoomsContainer } from './styles';
import { HotelUnique } from './HotelComponent/index';
import Room from './RoomComponent';
import { getTickets, getTicketsTypes } from '../../services/ticketsApi';

export default function HotelComponent() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ticket, SetTicket] = useState({})
  const [ticketType, SetTicketType] = useState({})
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    hotelsList();
    getUserTicket()
  }, []);

  async function getUserTicket() {
    const response = await getTickets(userData.token)
    const ticketType = await getTicketsTypes(userData.token)
    console.log(JSON.stringify(response.data))
    if (response) {
      SetTicketType(ticketType)
      SetTicket(response)
    }
  }


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


  if (ticket.status !== "PAID") {
     return (
      <>
       <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
       <Instruction>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</Instruction>
      </>
     )
  } else if (ticket.TicketType.includesHotel == false ) {
    return (
      <>
       <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
       <Instruction>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</Instruction>
      </>
     )
  } else {
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
                  <Room key={element.id} room={element} selectedRoom={selectedRoom}
                  setSelectedRoom={setSelectedRoom} />
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
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
