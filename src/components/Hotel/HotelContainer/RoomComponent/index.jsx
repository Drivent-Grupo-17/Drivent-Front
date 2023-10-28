import { Container } from './styles';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Room(props) {
  const { id, name, capacity, _count } = props.room;
  const { selectedRoom, setSelectedRoom, userRoom } = props;
  const [isFull, setIsFull] = useState(false);
  const [ocupation, setOcupation] = useState(null);

  useEffect(() => {
    const array = [];

    if (capacity === _count.Booking) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }

    const available = capacity - _count.Booking;

    for (let i = 0; i < available; i++) {
      if (selectedRoom === id && (i + 1 >= available)) {
        array.push('selected');
      } else {
        array.push('free');
      }
    }

    for (let i = 0; i < _count.Booking; i++) {
      array.push('reserved');
    }

    setOcupation(array);
  }, [selectedRoom, _count.Booking, capacity, id, userRoom?.id]);

  return (
    <Container
      disabled={isFull || userRoom?.id === id}
      isfull={isFull.toString() || (userRoom?.id === id).toString()}
      onClick={() => setSelectedRoom(id)}
      selected={selectedRoom === id}
    >
      <p>{name}</p>
      <div>
        {ocupation?.map((o, index) => o === 'free' ?
          <BsPerson key={index} /> :
          <BsPersonFill key={index} className={o} />
        )}
      </div>

    </Container>
  );
}


