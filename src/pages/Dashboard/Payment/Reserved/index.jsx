import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../contexts/UserContext.jsx"
import { getPersonalInformations } from "../../../../services/enrollmentApi.js";
import { toast } from 'react-toastify';
import { StyledTypography } from "../../../../components/PersonalInformationForm/index.jsx";
import { ConfirmationArea, Container, Content, FinishOrderMessage, HotelsOptionsList, Instruction, Message, OrderPrice, ReservationButton, TicketsTypeList } from "./styles.jsx";
import TicketType from "../../../../components/ItemTicketType/index.jsx";
import { getTicketsTypes,createTicketReservation } from "../../../../services/ticketsApi.js";
import { useNavigate } from "react-router";


export default function Payment() {
  const { userData } = useContext(UserContext)
  const [enrollment, setEnrollment] = useState(null)
  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hotelOption, setHotelOption] = useState({ option: null, value: null });
  const navigate = useNavigate()


  useEffect(() => {
    checkReservation();
    getUserEnrollment();
    getTicketsTypeList();
  }, []);

  async function getUserEnrollment() {
    try {
      const data = await getPersonalInformations(userData.token)
      console.log(data)
      setEnrollment(data);
    } catch (error) {
      toast('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
    }
  }

  async function getTicketsTypeList() {
    try {
      const data = await getTicketsTypes(userData.token);
      setTicketsTypes(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReservation(ticketTypeId) {
    const ticketWithoutHotel = ticketsTypes.filter(v => {
      if (v.isRemote === false && v.includesHotel === false) return v.id;
    });
    try {
      await createTicketReservation(userData.token, hotelOption.option === false ? ticketWithoutHotel[0].id : ticketTypeId);
      toast('Ingresso reservado com sucesso!!');
      navigate('/dashboard/processPayment');
    } catch (error) {
      if (error?.response?.data?.message === 'Ticket already exists for this enrollment.') {
        toast('Ingresso já reservado para esta inscrição. Escolha outra opção ou entre em contato para mais informações.');
      } else {
        toast('Ocorreu um erro ao tentar reservar o ingresso. Tente novamente.');
        console.log(error);
      }
    }
  }


  async function checkReservation() {
    try {
      const data = await getTicket(userData.token);
      
      if (data) navigate('/dashboard/processPayment');
    } catch (error) {
      console.log(`error ${error}`);
    }
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
                  return(
                    <TicketType 
                      isRemote={ticket.isRemote} 
                      ticket={ticket.name} 
                      includesHotel={ticket.includesHotel} 
                      price={ticket.price} 
                      key={ticket.id}
                      id={ticket.id}
                      selectedTicket= {selectedTicket}
                      setSelectedTicket = {setSelectedTicket}
                      currentTicket={ticket}
                      setHotelOption = {setHotelOption}
                    />
                  );
                }
              })}
            </TicketsTypeList>

            {selectedTicket ? 
              <>
                {!selectedTicket.isRemote && selectedTicket.includesHotel ?
                  <Instruction>Ótimo! Agora escolha sua modalidade de hospedagem</Instruction> :
                  <ConfirmationArea>
                    <FinishOrderMessage>Fechado! O total ficou em <OrderPrice>R$ {`${parseInt(selectedTicket.price/100)}`}</OrderPrice>. Agora é só confirmar:</FinishOrderMessage>
                    <ReservationButton onClick={() => handleReservation(selectedTicket.id)}>RESERVAR INGRESSO</ReservationButton>
                  </ConfirmationArea>
                }

                {(!selectedTicket.isRemote && selectedTicket.includesHotel === true) || !selectedTicket.includesHotel === false ?
                  <>
                  <HotelsOptionsList>

                  </HotelsOptionsList>
                  </>
                  : ''
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
