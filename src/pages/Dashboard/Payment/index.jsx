import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext.jsx"
import { getPersonalInformations } from "../../../services/enrollmentApi.js";
import { toast } from 'react-toastify';
import { StyledTypography } from "../../../components/PersonalInformationForm/index.jsx";
import { Container, Content, Instruction, Message, TicketsTypeList } from "./styles.jsx";
import TicketType from "../../../components/ItemTicketType/index.jsx";
import { getTicketsTypes } from "../../../services/ticketsApi.js";


export default function Payment() {
  const { userData } = useContext(UserContext)
  const [enrollment, setEnrollment] = useState(null)
  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hotelOption, setHotelOption] = useState({ option: null, value: null });

  useEffect(() => {
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
          </Content>

        }
      </Container>
    </>
  )
}
