import { useContext, useEffect, useState } from 'react';
import UserContext from "../../../contexts/UserContext.jsx"
import { CardConfirmation, Container, TextConfirmation } from './styles.jsx';
import { StyledTypography } from '../../../components/PersonalInformationForm/index.jsx';
import { getTickets } from '../../../services/ticketsApi.js';
import PaymentCreditCard from './CreditCard/index.jsx';

export default function processPayment() {
    const { userData } = useContext(UserContext)
    const [ticket, setTicket] = useState(null)


    useEffect(() => {
        getTicketsData();
    }, []);

    async function getTicketsData() {
        try {
            const dataTicket = await getTickets(userData.token);
            setTicket(dataTicket);
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