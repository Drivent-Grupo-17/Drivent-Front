import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { getHotels, getRoomsByHotelId } from '../../services/hotelsApi.js';
import { Container, ErrorContainer, HotelsContainer, RoomsContainer } from './styles';
import { HotelUnique } from './HotelComponent/index';
import Room from './RoomComponent';
import { getTickets, getTicketsTypes } from '../../services/ticketsApi';

export default function HotelComponent() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ticket, SetTicket] = useState({});
  const [ticketType, SetTicketType] = useState({});
  useEffect(() => {
    hotelsList();
    getUserTicket();
  }, []);

  async function getUserTicket() {
    const response = await getTickets(userData.token);
    const ticketType = await getTicketsTypes(userData.token);

    if (response) {
      SetTicketType(ticketType);
      SetTicket(response);
    }
  }

  async function hotelsList() {
    try {
      const response = await getHotels(userData.token);
      setHotels(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function roomsList(hotelId) {
    try {
      const response = await getRoomsByHotelId(hotelId, userData.token);
      let array = [];
      array = response.Rooms.map((element) => {
        return { ...element };
      });
      setRooms(array);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(ticket);

  if (ticket.status !== 'PAID') {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ErrorContainer>
          <Instruction>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</Instruction>
        </ErrorContainer>
      </>
    );
  } else if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ErrorContainer>
          <Instruction style={{ marginBottom: '-0px' }}>Sua modalidade de ingresso não inclui hospedagem</Instruction>
          <Instruction>Prossiga para a escolha de atividades</Instruction>
        </ErrorContainer>
      </>
    );
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
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
