import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getActivities, getDays } from '../../services/activitiesApi';
import UserContext from '../../contexts/UserContext';
import {
  Container,
  DaysContainer,
  TabbleColumnsContainer,
  TabbleContainer,
  TableColumns,
  TableColumnsTitle,
} from './styles';
import DayComponent from './Days';
import { Activitie } from './Activity';
import { getTickets } from '../../services/ticketsApi';

export default function ActivitiesComponent() {
  const [daysActivity, setDays] = useState([]);
  const { userData } = useContext(UserContext);
  const [selected, setSelected] = useState(null);
  const [activities, setActivities] = useState([]);
  const [ticket, setTicket] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [hasBooking, setHasBooking] = useState(null);

  useEffect(() => {
    getUserTicket();
  }, []);
  const getUserTicket = async () => {
    try {
      const response = await getTickets(userData.token);
      setTicket(response);
      setLoaded(true);

      if (
        response.TicketType.includesHotel === true &&
        response.TicketType.isRemote === false &&
        response.status === 'PAID'
      )
        getDaysOfActivity(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(loaded)

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
      if (error.response.data.message === 'Usuário não possui reserva!') {
        setHasBooking(false);
      }
    }
  
  };

  function handleClick(day, selecteDay) {
    setSelected(day);
    getActivitiesByDate(selecteDay);
  }

  async function getActivitiesByDate(selectedDay) {
    console.log(selectedDay)
    const activiti = await getActivities(selectedDay, userData.token);
    setActivities(activiti);
  }

  if (loaded === true) {
    if (ticket.status === 'RESERVED') {
      return (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
          <Instruction>Você precisa ter confirmado o pagamento antes de fazer a escolha das atividades</Instruction>
        </>
      );
    } else if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
      return (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
          <Instruction>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades
          </Instruction>
        </>
      );
    } else if (hasBooking === false) {
      return (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
          <Instruction>Você precisa ter feito uma reserva antes de fazer a escolha das atividades</Instruction>
        </>
      );
    } else {
      return (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
          <Instruction>Primeiro, filtre pelo dia do evento:</Instruction>
          <Container>
            <DaysContainer>
              {daysActivity.map((element) => (
                <DayComponent key={element.startsAt} day={element} handleClick={handleClick} selected={selected} />
              ))}
            </DaysContainer>
            <TabbleContainer>
              <TabbleColumnsContainer>
                <TableColumnsTitle>Auditorio Principal</TableColumnsTitle>
                <TableColumns>
                  {activities.map((act) => {
                    if (act.location === 'Auditório Principal') {
                      return <Activitie key={act.id} data={act} getActivities={getActivitiesByDate} />;
                    }
                  })}
                </TableColumns>
              </TabbleColumnsContainer>
              <TabbleColumnsContainer>
                <TableColumnsTitle>Auditorio Central</TableColumnsTitle>
                <TableColumns borderoff={true}>
                  {activities.map((act) => {
                    if (act.location === 'Auditório Lateral') {
                      return <Activitie key={act.id} data={act} getActivities={getActivitiesByDate} />;
                    }
                  })}
                </TableColumns>
              </TabbleColumnsContainer>
              <TabbleColumnsContainer>
                <TableColumnsTitle>Auditorio Lateral</TableColumnsTitle>
                <TableColumns>
                  {activities.map((act) => {
                    if (act.location === 'Sala de Workshop') {
                      return <Activitie key={act.id} data={act} getActivities={getActivitiesByDate} />;
                    }
                  })}
                </TableColumns>
              </TabbleColumnsContainer>
            </TabbleContainer>
          </Container>
        </>
      );
    }
  }
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
