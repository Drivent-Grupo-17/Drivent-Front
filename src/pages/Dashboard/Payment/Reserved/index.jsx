import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../contexts/UserContext.jsx"
import { getPersonalInformations } from "../../../../services/enrollmentApi.js";
import { toast } from 'react-toastify';
import { StyledTypography } from "../../../../components/PersonalInformationForm/index.jsx";
import { ConfirmationArea, Container, Content, FinishOrderMessage, HotelsOptionsList, Instruction, Message, OrderPrice, ReservationButton, TicketsTypeList, HotelsOptionsItem, Description, HotelPrice } from "./styles.jsx";
import TicketType from "../../../../components/ItemTicketType/index.jsx";
import { getTicketsTypes, createTicketReservation } from "../../../../services/ticketsApi.js";
import { useNavigate } from "react-router";
import { getTickets } from "../../../../services/ticketsApi.js";

export default function Payment() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hotelOption, setHotelOption] = useState({ option: null, value: null });
  const [selectedWithHotel, setSelectedWithHotel] = useState(false);


  useEffect(() => {
    checkReservation();
    getUserEnrollment();
    getTicketsTypeList();
  }, []);

  async function getUserEnrollment() {
    try {
      const data = await getPersonalInformations(userData.token);
      setEnrollment(data);
    } catch (error) {
      toast('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
    }
  }

  async function getTicketsTypeList() {
    try {
      const data = await getTicketsTypes(userData.token);
      setTicketsTypes(data);
    } catch (error) {
      console.error(error);
    }
  }


  async function handleReservation(ticketTypeId) {
    const ticketWithoutHotel = ticketsTypes.find(v => !v.isRemote && !v.includesHotel);
    const ticketToReserve = hotelOption.option === false ? ticketWithoutHotel.id : ticketTypeId;

    try {
      await createTicketReservation(userData.token, ticketToReserve);
      toast('Ingresso reservado com sucesso!!');
      navigate('/dashboard/processPayment');
    } catch (error) {
      if (error?.response?.data?.message === 'Ticket already exists for this enrollment.') {
        toast('Ingresso já reservado para esta inscrição. Escolha outra opção ou entre em contato para mais informações.');
      } else {
        toast('Ocorreu um erro ao tentar reservar o ingresso. Tente novamente.');
        console.error(error);
      }
    }

  }

  async function checkReservation() {
    try {
      const data = await getTickets(userData.token);
      if (data) {
        navigate('/dashboard/processPayment')
      } else {
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  function handleHotelOption(option) {
    setHotelOption(option);
    setSelectedWithHotel(option.option);
  }


  return (
    <>
      <StyledTypography>
        Ingresso e pagamento
      </StyledTypography>

      <Container>
        {!enrollment ? <Message>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Message>
          :
          <Content>
                <Instruction>
                  Primeiro, escolha sua modalidade de ingresso
                </Instruction>

                <TicketsTypeList>
                  {ticketsTypes.map(ticket => {
                    if (
                      (ticket.isRemote === false && ticket.includesHotel === true) ||
                      (ticket.isRemote === true)

                    ) {
                      return (
                        <TicketType
                          isRemote={ticket.isRemote}
                          ticket={ticket.name}
                          includesHotel={ticket.includesHotel}
                          price={ticket.price}
                          key={ticket.id}
                          id={ticket.id}
                          selectedTicket={selectedTicket}
                          setSelectedTicket={setSelectedTicket}
                          currentTicket={ticket}
                          setHotelOption={setHotelOption}
                        />

                      );
                    }
                  })}
                </TicketsTypeList>

                {selectedTicket ?
                  <>
                    {!selectedTicket.isRemote && selectedTicket.includesHotel ?
                      <Instruction>Ótimo! Agora escolha sua modalidade de hospedagem</Instruction>
                      :
                      <ConfirmationArea>
                        <FinishOrderMessage>Fechado! O total ficou em <OrderPrice>R$ {`${parseInt((selectedTicket.price + hotelOption.value) / 100)}`}</OrderPrice>. Agora é só confirmar:</FinishOrderMessage>

                        <ReservationButton onClick={() => handleReservation(selectedTicket.id)}>RESERVAR INGRESSO</ReservationButton>
                      </ConfirmationArea>
                    }

                    {selectedTicket && selectedTicket.includesHotel ?
                      <>
                        <HotelsOptionsList>
                          <HotelsOptionsItem selected={hotelOption.option === false} onClick={() => handleHotelOption({ option: false, value: 0 })}>
                            <Description>Sem Hotel</Description>
                            <HotelPrice>{'+ R$ 0'}</HotelPrice>
                          </HotelsOptionsItem>
                          <HotelsOptionsItem selected={hotelOption.option === true} onClick={() => handleHotelOption({ option: true, value: 350 })}>
                            <Description>Com Hotel</Description>
                            <HotelPrice>{'+ R$ 350'}</HotelPrice>
                          </HotelsOptionsItem>
                        </HotelsOptionsList>
                        {hotelOption.value !== null && hotelOption.option !== null ?
                          <ConfirmationArea>
                            <FinishOrderMessage>Fechado! O total ficou em <OrderPrice>R$ {`${parseInt((selectedTicket.price) / 100) + hotelOption.value}`}</OrderPrice>. Agora é só confirmar:</FinishOrderMessage>

                            <ReservationButton onClick={() => handleReservation(selectedTicket.id)}>RESERVAR INGRESSO</ReservationButton>
                          </ConfirmationArea>
                          :
                          ''
                        }
                      </>
                      :
                      ''
                    }

                  </>

                  : ''
                }
          </Content>
        }
      </Container>
    </>
  )
}
