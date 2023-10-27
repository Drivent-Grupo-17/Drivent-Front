import { Container } from './styles';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Room(props) {
  const { id, name, capacity, _count } = props.room;
  const { selectedRoom, setSelectedRoom } = props

  

  let capacityArray = [];
  for (let i = 0; i < capacity; i++) {
    if (i < _count.Booking) {
      capacityArray.push(true);
    } else {
      capacityArray.push(false);
    }
  }


  return (
    <Container onClick={() => setSelectedRoom(id)} selected={selectedRoom === id}>

      <p>{name}</p>
      <div>
        {capacityArray.map((element) => {
          if (!element) {
            return <BsPerson key={Math.random().toString()} style={{ fontSize: '24px' }} />;
          } else {
            return <BsPersonFill key={Math.random().toString()} style={{ fontSize: '24px' }} />;
          }
        })}
      </div>
    </Container>
  );
}
