import React from "react";
import styled from "styled-components";

export default function ReservationNav({reserveType, message}) {

    return (
        <ReservationTopNav>
            <MainMsg>{reserveType}</MainMsg>
            <SubMsg>{message}</SubMsg>
        </ReservationTopNav>
    )
}

const ReservationTopNav = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 350px;

    margin: 15px 0px;
`

const MainMsg = styled.div`
    font-size: 2em;
    font-weight: bold;

    margin-bottom: 10px;
`
const SubMsg = styled.div`
    font-size: 1.3em;
    font-weight: bold;

    margin-bottom: 15px;
`
