import { Typography } from '@mui/material';
import { Instruction } from '../../pages/Dashboard/Payment/Reserved/styles';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getActivities, getDays } from '../../services/activitiesApi';
import UserContext from '../../contexts/UserContext';
import { Container, DaysContainer, TabbleColumnsContainer, TabbleContainer, TableColumns, TableColumnsTitle } from './styles';
import DayComponent from './Days';
import { Activitie } from './activitie';

export default function ActivitiesComponent() {
  const [daysActivity, setDays] = useState([]);
  const { userData } = useContext(UserContext);
  const [selected, setSelected] = useState(null);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getDaysOfActivity()
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

  function handleClick(day, selecteDay) {
    setSelected(day);
    getActivitiesByDat(selecteDay)
  }

  async function getActivitiesByDat(selectedDay) {
    const activiti = await getActivities(selectedDay, userData.token)
    setActivities(activiti)
  }

  console.log(activities)
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
                if (act.location === "Auditório Principal") {
                  return <Activitie key={act.id} data={act} />
                }
              })
              }
            </TableColumns>
          </TabbleColumnsContainer>
          <TabbleColumnsContainer>
            <TableColumnsTitle>Auditorio Central</TableColumnsTitle>
            <TableColumns borderoff={true}>
              {activities.map((act) => {
                if (act.location === "Auditório Lateral") {
                  return <Activitie key={act.id} data={act} />
                }
              })
              }
            </TableColumns>
          </TabbleColumnsContainer>
          <TabbleColumnsContainer>
            <TableColumnsTitle>Auditorio Lateral</TableColumnsTitle>
            <TableColumns>
            {activities.map((act) => {
                if (act.location === "Sala de Workshop") {
                  return <Activitie key={act.id} data={act} />
                }
              })
              }
            </TableColumns>
          </TabbleColumnsContainer>
        </TabbleContainer>
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
