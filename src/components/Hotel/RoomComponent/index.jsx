import { Container } from './styles';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Room(props) {
  const { id, name, capacity, _count } = props.room;
  let capacityArray = [];
  for (let i = 0; i < capacity; i++) {
    if (i < _count.Booking) {
      capacityArray.push(true);
    } else {
      capacityArray.push(false);
    }
  }
  return (
    <Container isFull={capacity === _count.Booking} disabled={capacity === _count.Booking}>
      <p>{name}</p>
      <div>
        {capacityArray.map((element) => {
          if (!element) {
            return <BsPerson style={{ fontSize: '24px' }} />;
          } else {
            return <BsPersonFill style={{ fontSize: '24px' }} />;
          }
        })}
      </div>
    </Container>
  );
}
