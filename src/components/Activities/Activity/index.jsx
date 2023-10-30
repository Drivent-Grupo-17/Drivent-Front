import doorOpen from '../../../assets/images/pepicons_enter.svg';
import doorClosed from '../../../assets/images/ant-design_close-circle-outlined.svg';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { ActivitieSubscripition } from '../../../services/activitiesApi';
import {
  ActivitieContainer,
  ActivitieSubTitle,
  ActivitieTitle,
  ActivitieTitleContainer,
  ButtonContainer,
  StyledClose,
} from './styles';
import { Typography } from '@mui/material';
import styled from 'styled-components';

export const Activitie = ({ data, getActivities }) => {
  const { userData } = useContext(UserContext);
  const startDate = new Date(data.startsAt);
  const endDate = new Date(data.endsAt);
  const startHour = `${startDate.getHours().toString().padStart(2, '0')}:${startDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  const endHour = `${endDate.getHours().toString().padStart(2, '0')}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
    
  const handleSubscription = async () => {
    console.log('a');
    const date = data.startsAt.split('T')[0];
    await ActivitieSubscripition(data.id, userData.token);
    getActivities(date);
  };

  if (data.capacity === 0 || data.capacity === data._count.Subscription) {
    return (
      <ActivitieContainer>
        <ActivitieTitleContainer>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="subtitle1">{`${startHour} - ${endHour}`}</Typography>
        </ActivitieTitleContainer>
        <ButtonContainer color={'red'} disabled>
          <img src={doorClosed} />
          <p>Esgotado</p>
        </ButtonContainer>
      </ActivitieContainer>
    );
  } else if (data.Subscription.length) {
    return (
      <ActivitieContainer color={'#d0ffdb'}>
        <ActivitieTitleContainer>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="subtitle1">{`${startHour} - ${endHour}`}</Typography>
        </ActivitieTitleContainer>
        <ButtonContainer disabled>
          <StyledClose />
          <p>Inscrito</p>
        </ButtonContainer>
      </ActivitieContainer>
    );
  } else {
    return (
      <ActivitieContainer>
        <ActivitieTitleContainer>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="subtitle1">{`${startHour} - ${endHour}`}</Typography>
        </ActivitieTitleContainer>
        <ButtonContainer onClick={() => handleSubscription()}>
          <img src={doorOpen} />
          <p>{data.capacity} vagas</p>
        </ButtonContainer>
      </ActivitieContainer>
    );
  }
};

const StyledTypography = styled(Typography)``;
