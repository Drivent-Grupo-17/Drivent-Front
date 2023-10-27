import { Typography } from '@mui/material';
import { Container } from './styles';
import { useState } from 'react';

export default function DayComponent(props) {
  const { startsAt, day } = props.day;
  const { handleClick, selected } = props;

  const dateArray = startsAt.split('-');
  const date = `${dateArray[2]}/${dateArray[1]}`;

  return (
    <Container selected={selected === date ? true : false} onClick={() => handleClick(date)}>
      <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
        {day}, {date}
      </Typography>
    </Container>
  );
}