import React from 'react';
import styled from 'styled-components';
import Room from './RoomComponent';
import { Typography } from '@mui/material';
import { Instruction } from '../../../pages/Dashboard/Payment/Reserved/styles';
import { HotelUnique } from './HotelComponent';
import UserContext from '../../../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { getUserBooking, changeUserBooking, createUserBooking } from '../../../services/bookingApi';
import { toast } from 'react-toastify';
import { getRoomsByHotelId } from '../../../services/hotelsApi';
const HotelSelection = ({ hotels, roomsList, rooms, handleData }) => {

    const { userData } = useContext(UserContext);
    const [userBooking, setUserBooking] = useState(null);
    const [changingRoom, setChangingRoom] = useState(false);
    const [hotelDetails, setHotelDetails] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selected, setSelected] = useState(null);


    useEffect(() => {
        async function fetchData() {
            if (selectedRoom) {
                setSelectedRoom(null);
            }
            await handleUserBooking();
        }
        fetchData(); // Chame a função imediatamente
    }, [selected, changingRoom]);


    async function handleUserBooking() {
        try {
          const booking = await getUserBooking(userData.token);
          setUserBooking(booking);
    
          if (booking && booking.Room) {
            const details = await getHotelDetails(booking.Room.hotelId);
            // console.log(details)
            setHotelDetails(details);
            if (selectedRoom) setSelectedRoom(null);
          }
        } catch (error) {
          console.log(error);
        }
      }
      console.log(userBooking)

      console.log(JSON.stringify(userBooking))

    async function getHotelDetails(hotelId) {
        try {
            const response = await getRoomsByHotelId(userData.token, hotelId)
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async function bookingRoom(roomId) {
        try {
            if (userBooking) {
                await changeUserBooking(userData.token, { roomId }, userBooking.id);
                toast('Sua reserva foi alterada!');
                setChangingRoom(false);
                await handleData();
                return await handleUserBooking();
            }
            await createUserBooking(userData.token, { roomId });
            toast('Sua reserva foi efetuada!');
            await handleUserBooking();
            setChangingRoom(false);
            await handleData();
        } catch (error) {
            console.log(error);
        }
    }


    async function handleChangingRoom() {
        setChangingRoom(false);
        setSelectedRoom(null);
        toast('Alterações canceladas!');
        await handleData();
    }

    return (
        <>
            {userBooking && !changingRoom ?

                <SeeingUserRoomContainer $roomseeing={String(userBooking && !changingRoom)}>
                    <TextConfirmation>Você ja escolheu seu quarto: </TextConfirmation>
                    <UserHotelCard>
                        <Picture src={hotelDetails?.image} alt={hotelDetails?.name} />
                        <Info>
                            <Name>{hotelDetails?.name}</Name>
                            <Topic>
                                <span>Quarto reservado</span>
                                <p>{userBooking?.Room?.name} ({userBooking?.Room?.capacity === 1 ? 'Single' : userBooking?.Room?.capacity === 2 ? 'Double' : 'Triple'})</p>
                            </Topic>
                            <Topic>
                                <span>Pessoas no seu quarto</span>
                                <p>Você {userBooking?.Room?._count > 1 ? `e mais ${userBooking.Room._count - 1}` : ''}</p>
                            </Topic>
                        </Info>
                    </UserHotelCard>

                    <ChangeRoom onClick={() => {
                        setChangingRoom(true);
                        handleData();
                        setSelected(null);
                    }}>TROCAR DE QUARTO</ChangeRoom>
                </SeeingUserRoomContainer>
                :
                <>
                    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
                    <Instruction>Primeiro, escolha seu hotel</Instruction>
                    <Container>
                        <HotelsContainer>
                            {hotels.map((element) => {
                                if (element.capacity - element.bookings === 0) {
                                    return null; // Ou outra ação, se necessário
                                } else {
                                    return (
                                        <HotelUnique
                                            key={element.id}
                                            hotel={element}
                                            selected={selected}
                                            setSelected={setSelected}
                                            roomsList={roomsList}
                                        />
                                    );
                                }
                            })}
                        </HotelsContainer>
                        {rooms.length !== 0 ? (
                            <div>
                                <Instruction>Ótima pedida! Agora escolha seu quarto:</Instruction>
                                <RoomsContainer>
                                    {rooms.map((element) => (
                                        <Room key={element.id} room={element} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} userRoom={userBooking?.Room} />
                                    ))}
                                </RoomsContainer>

                                {selectedRoom ?
                                    <BookingRoom onClick={() => bookingRoom(selectedRoom)}>RESERVAR QUARTO</BookingRoom>
                                    :
                                    <></>
                                }
                            </div>
                        ) : (
                            ''
                        )}
                    </Container>
                </>
            }
        </>
    );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;

export default HotelSelection;

const SeeingUserRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 50px;
`;

const UserHotelCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  width: 196px;
  height: 264px;
  background-color:#FFEED2;
  border-radius: 10px;
  color: #343434;
`;

export const RoomsContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 8px 17px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  width: 100%;
  /* height: 90%; */

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const HotelsContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 19px;
`;

const Info = styled.div`
display: flex;
height: 100px;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
`;

export const TextConfirmation = styled.p`
  color:#8E8E8E;
  font-size: 20px;
  margin: 20px 0;
`;

export const RoomContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  padding: 20px 0;
`;

export const SelectHotelsContainer = styled.div`
  padding-bottom: 20px;
`;

export const BookingRoom = styled.button`
  width: 182px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
`;

const ChangeRoom = styled.button`
  width: 182px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
`;

const Picture = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const Name = styled.span`
  font-size: 20px;
  text-align: left;
`;

const Topic = styled.div`
  font-size: 12px;
  line-height: 14px;
  span{
    font-weight: 700;
  }
  p{
    font-weight: 400;
  }
  `;

