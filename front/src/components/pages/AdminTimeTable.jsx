import TimeBox from "./TimeBox";
import styled from "styled-components";
import "../css/CustomCalendar.css";

export default function AdminTimeTable({onTimeHandler, reservedStatusList}) {
    const timeSchdule = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    return (
        <TimeContainer>
            {timeSchdule.map((it, idx) => <BoxContainer key={idx}><TimeBox key={it} id={it} reservedStatusList={reservedStatusList[idx]}/><Ptag>{it}</Ptag></BoxContainer>)}
        </TimeContainer>
    );
}

const TimeContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const BoxContainer = styled.div`
    width: 15%;
`

const Ptag = styled.p`
    margin-top: 7px;
    text-align: center;
`

