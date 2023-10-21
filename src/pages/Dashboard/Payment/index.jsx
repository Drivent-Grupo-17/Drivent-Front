import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { getTickets } from "../../../services/ticketsApi";
import { Container, Content, Instruction, TicketsTypeList } from "./Reserved/styles.jsx";
import { StyledTypography } from "../../../components/PersonalInformationForm";
import { Price, TicketTypeItem, Type } from "../../../components/ItemTicketType/styles";
import { PaymentConfirmed, PaymentConfirmedContent } from "./styles";
import Group from "../../../assets/images/Group.svg"

export default function processPayment() {
    const { userData } = useContext(UserContext)
    const [selectedTicket, setSelectedTicket] = useState({})

    useEffect(() => {
        checkReservation();
    }, [])

    async function checkReservation() {
        try {
            const data = await getTickets(userData.token);
            if (data) {
                setSelectedTicket({ ...selectedTicket, status: "PAID" })
            } else {
            }
        } catch (error) {
            console.log(`error ${error}`);
        }
    }
    return (
        <>
            <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
            <Container>
                <TextConfirmation>Ingresso Escolhido</TextConfirmation>
                <CardConfirmation>
                    <h2>{
                        ticket?.TicketType.name === 'Online' ? ticket?.TicketType.name
                            : ticket?.TicketType.name === 'Presencial' && ticket?.TicketType.includesHotel === true ? `${ticket?.TicketType.name} + Com Hotel`
                                : `${ticket?.TicketType.name} + Sem Hotel`
                    }</h2>
                    <h3>{`R$ ${(parseInt(ticket?.TicketType.price / 100) + ((ticket?.TicketType.includesHotel === true ? 35000 : 0) / 100))}`}</h3>
                </CardConfirmation>

                <TextConfirmation>Pagamento</TextConfirmation>
                
                <PaymentCreditCard/>

            </Container>
        </>
    )
}