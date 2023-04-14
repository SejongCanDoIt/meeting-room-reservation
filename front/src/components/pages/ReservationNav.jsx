import { useState } from "react"
import { useEffect } from "react"
import React from "react";
import styled from "styled-components";

export default function ReservationNav({reserveType, message, isRegular}) {

    return (
        <ReservationTopNav>
            <MainMsg>{reserveType}</MainMsg>
            <SubMsg>{message}</SubMsg>
            {isRegular ? 
            <TypeBox>
                <DayTypeBtn>일간</DayTypeBtn>
                <WeekTypeBtn>주간</WeekTypeBtn>
                <MonthTypeBtn>월간</MonthTypeBtn>
            </TypeBox> : 
            
            <></>}
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



const TypeBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

const DayTypeBtn = styled.div`
    padding: 5px;
    background-color: #FF8484;
    border-radius: 10px;

    font-weight: bold;
`
const WeekTypeBtn = styled.div`
    padding: 5px;
    background-color: #FFF59E;
    border-radius: 10px;

    font-weight: bold;
`
const MonthTypeBtn = styled.div`
    padding: 5px;
    background-color: #95FFE6;
    border-radius: 10px;

    font-weight: bold;
`