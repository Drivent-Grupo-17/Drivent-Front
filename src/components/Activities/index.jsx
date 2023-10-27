import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getDays } from '../../services/activitiesApi';
import UserContext from '../../contexts/UserContext';
import { Container, DaysContainer } from './styles';
import DayComponent from './Days';

export default function ActivitiesComponent() {
  const [daysActivity, setDays] = useState([]);
  const { userData } = useContext(UserContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getDaysOfActivity();
  }, []);

  const getDaysOfActivity = async () => {
    try {
      const response = await getDays(userData.token);
      setDays(response);
      const actualDay = new Date(Date.now()).toISOString().split('T')[0];
      response.map((element) => {
        if (element.startsAt >= actualDay) {
          return { ...element };
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick(day) {
    setSelected(day);
  }

  console.log(daysActivity);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Instruction>Primeiro, filtre pelo dia do evento:</Instruction>
      <Container>
        <DaysContainer>
          {daysActivity.map((element) => (
            <DayComponent key={element.startsAt} day={element} handleClick={handleClick} selected={selected}/>
          ))}
        </DaysContainer>
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
