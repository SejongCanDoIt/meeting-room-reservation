import styled from "styled-components";
import "../css/CustomCalendar.css";

export default function TimeBox({id, reservedStatusList, timeClicked, isClicked}) {

    const onSelectedHandler = () => {
        isClicked(id);
    }

    return (
        <TBox className={timeClicked} reserved={reservedStatusList} onClick={onSelectedHandler}></TBox>
    );
}

const TBox = styled.div`
    width: 100%;
    height: 30px;
    border: 1px solid black;

    background-color: ${props => props.reserved ? "#e63946" : ""}
`
