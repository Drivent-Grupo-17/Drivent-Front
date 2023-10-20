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
            <StyledTypography>
                Ingresso e pagamento
            </StyledTypography>
            <Container>
                <Content>
                    <Instruction>Ingresso escolhido</Instruction>
                    <TicketsTypeList>
                        <TicketTypeItem selected={true} width={"400px"}>
                            <Type>Presencial + com hotel</Type>
                            <Price>+R$350</Price>
                        </TicketTypeItem>
                    </TicketsTypeList>
                    <Instruction>Pgamento</Instruction>
                    {selectedTicket.status === "PAID" ? <PaymentConfirmed>
                        <img src={Group} alt="" />
                        <PaymentConfirmedContent>
                            <Type>Pagamento confirmado!!</Type>
                            <Price>Prossiga para a escolha de hospedagem e atividades</Price>
                        </PaymentConfirmedContent>
                    </PaymentConfirmed> : ""}
                </Content>
            </Container>
        </>
    )
}