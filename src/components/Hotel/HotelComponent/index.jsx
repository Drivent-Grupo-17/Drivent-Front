import { Typography } from '@mui/material';
import { Container } from './style';

export function HotelUnique(props) {
  const { id, name, image, bookings, capacity, accommodationMax } = props.hotel;
  const { selected, setSelected } = props;
  function handleClick() {
    setSelected(id);
  }

  return (
    <Container onClick={handleClick} selected={selected === id}>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <Typography variant="h5" style={{ fontWeight: '400', fontSize: '20px' }}>
        {name}
      </Typography>
      <div>
        <Typography variant="h6" style={{ fontWeight: '700', fontSize: '12px' }}>
          Tipo de acomodação:
        </Typography>
        <Typography variant="subtitle1">
          {accommodationMax === 1 ? 'Single' : accommodationMax === 2 ? 'Single e Double' : 'Single, Double e Triple'}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" style={{ fontWeight: '700', fontSize: '12px' }}>
          Vagas disponíveis:
        </Typography>
        <Typography variant="subtitle1">{capacity - bookings}</Typography>
      </div>
    </Container>
  );
}
