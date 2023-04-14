import TimeBox from "./TimeBox";
import styled from "styled-components";
import "../css/CustomCalendar.css";
import { useEffect, useState } from "react";




export default function TimeTable({onTimeHandler, reservedStatusList}) {

    const timeSchdule = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const [clickedStatus, setClickedStatus] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    const onClickHanlder = (clickedTime) => {
        const newTimeList = [...clickedStatus];
        if (start === 0) {
            // 시작 시간 상태 변경
            setStart(clickedTime);

            // 시작 시간에 대한 새로운 상태 반영
            newTimeList[clickedTime-7] = 1;
            setClickedStatus((state) => [...newTimeList]);
        }

        // 시작 시간은 선택되어있고, 끝나는 시간을 선택할때.
        else if (end === 0) {
            setEnd(clickedTime);


            // 끝나는 시간이 시작시간보다 앞설때
            if (start >= clickedTime) {
                setClickedStatus((state) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                setStart(0);
                setEnd(0);
                alert("끝나는 시간은 시작 시간보다 앞서야 합니다");
            }

        
            else {
                for(let i=start - 7 ; i <= clickedTime-7 ; i++) {
                    newTimeList[i] = 1
                }
                setClickedStatus((state) => [...newTimeList]);
            }
        }
        else {
            setStart(0);
            setEnd(0);
            setClickedStatus((state) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }

    // Reservation 컴포넌트에 함수를 통해 시간값을 넘겨줌.
    useEffect(() => {
        onTimeHandler(start, end);
    }, [start, end])

    return (
        <TimeContainer>
            {timeSchdule.map((it, idx) => <BoxContainer key={idx}><TimeBox key={it} id={it} reservedStatusList={reservedStatusList[idx]} timeClicked={clickedStatus[idx] ? "time_clicked" : ""} isClicked={onClickHanlder}/><Ptag>{it}</Ptag></BoxContainer>)}
        </TimeContainer>
    );
}

const TimeContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 350px;
    justify-content: center;

    // background-color: gray;
`

const BoxContainer = styled.div`
    width: 14%;
`

const Ptag = styled.p`
    margin-top: 5px;
    text-align: right;
`

