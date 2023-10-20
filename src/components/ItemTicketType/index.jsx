import { Price, TicketTypeItem, Type } from './styles.jsx';

export default function TicketType({ ticket, price, selectedTicket, setSelectedTicket, id, currentTicket }) {
  return (
    <TicketTypeItem onClick={ () => {!currentTicket.isRemote? setSelectedTicket({...currentTicket,price:35000}):setSelectedTicket(currentTicket)}} selected={currentTicket.id===selectedTicket?.id}>
      <Type>{ticket}</Type>
      <Price>{`R$ ${parseInt(price/100)}`}</Price>
    </TicketTypeItem>
  );
}