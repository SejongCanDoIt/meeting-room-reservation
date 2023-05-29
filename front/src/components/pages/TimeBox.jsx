import styled from "styled-components";
import "../css/CustomCalendar.css";

export default function TimeBox({id, reservedStatusList}) {
    return (
        <TBox reserved={reservedStatusList}></TBox>
    );
}

const TBox = styled.div`
    width: 100%;
    height: 30px;
    // border: 1px solid black;

    background-color: ${props => props.reserved ? "#e63946" : ""}
`
