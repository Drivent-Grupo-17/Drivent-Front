import doorOpen from "../../../assets/images/pepicons_enter.svg"
import styled from "styled-components"
import doorClosed from "../../../assets/images/ant-design_close-circle-outlined.svg"
import { useContext } from "react"
import UserContext from "../../../contexts/UserContext"
import { ActivitieSubscripition } from "../../../services/activitiesApi"
export const Activitie = ({ data }) => {
    const {userData} = useContext(UserContext)
    console.log(data.Subscription)
    const handleSubscription = async () => {
      await  ActivitieSubscripition(data.id,userData.token)
      window.location.reload()
    }
    if (data.capacity === 0) {
        return (
            <ActivitieContainer>
                <ActivitieTitleContainer>
                    <ActivitieTitle>{data.name}</ActivitieTitle>
                    <ActivitieSubTitle></ActivitieSubTitle>
                </ActivitieTitleContainer>
                <ButtonContainer color={"red"}><img src={doorClosed} />
                <p>esgotado</p>
                </ButtonContainer>
            </ActivitieContainer>
        )
    } else if(data.Subscription.length){
        return (
            <ActivitieContainer>
                <ActivitieTitleContainer>
                    <ActivitieTitle>{data.name}</ActivitieTitle>
                    <ActivitieSubTitle></ActivitieSubTitle>
                </ActivitieTitleContainer>
                <ButtonContainer><img src={doorOpen} />
                    <p>inscrito</p>
                </ButtonContainer>
            </ActivitieContainer>
        )
    } else{
        return (
            <ActivitieContainer>
                <ActivitieTitleContainer>
                    <ActivitieTitle>{data.name}</ActivitieTitle>
                    <ActivitieSubTitle></ActivitieSubTitle>
                </ActivitieTitleContainer>
                <ButtonContainer onClick={()=> handleSubscription()}><img src={doorOpen} />
                    <p>{data.capacity} vagas</p>
                </ButtonContainer>
            </ActivitieContainer>
        )
    }
}

const ActivitieContainer = styled.div`
  width: 90%;   
  height:80px;
  background-color: #F1F1F1;
  margin-top:10px;
  display:flex;
  border-radius: 5px;
  justify-content: space-between;
`

const ActivitieTitleContainer = styled.div`
 margin:10px 10px;

`
const ActivitieTitle = styled.div`
`
const ActivitieSubTitle = styled.div`

`
const ButtonContainer = styled.div`
    height:60px;
    margin: auto 0;
    border-left:1px solid #CFCFCF;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    img{
        margin: 0 20px;
    }
    p{
        color:${({color})=> color? color : "green"};
        font-size:10px;
        margin-top:10px;
    }
`