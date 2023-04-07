import styled from "styled-components";
import ReservationNav from "./ReservationNav";
import RegularOptions from "./RegularOptions";
import { useState } from "react";
import { useEffect } from "react";

export default function Reservation() {
    const type = "정기 예약";

    const [isRegular, setIsRegular] = useState(false);

    useEffect(() => {
        if (type === "정기 예약") {
            setIsRegular(true);
        }
        else {
            setIsRegular(false);
        }
    }, [])

    return (
        <ReservationContainer>
            <ReservationNav reserveType={type} message="언제 사용하실 건가요?" isRegular={isRegular}/>
            <CalendarBox></CalendarBox>
            {isRegular ? <RegularOptions></RegularOptions> : <></>}
            <TimeBox>
                <TimeTable></TimeTable>
                <Ptag>사용하실 날짜와 시간을 선택해주세요</Ptag>
            </TimeBox>
            
        </ReservationContainer>

    );
}

const ReservationContainer = styled.div`
    height: 95vh;
    // max-height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const CalendarBox = styled.div`
    width: 100%;
    max-width: 350px;
    height: 500px;

    background-color: gray;
    border-radius: 15px;

    margin: 10px 0px;

`

const TimeBox = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 10px 0px;
`
const TimeTable = styled.div`
    width: 100%;
    max-width: 350px;
    height: 50px;

    background-color: #FFC773;
    border-radius: 10px;

    margin: 10px 0px;
`

const Ptag = styled.p`
    color: #929292;
    margin-top: 7px;
`



