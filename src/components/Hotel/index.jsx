import { Typography } from "@mui/material"
import styled from "styled-components"

export default function HotelComponent() {
    return (
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    )
}

const StyledTypography = styled(Typography)`
      margin-bottom: 20px!important;
`