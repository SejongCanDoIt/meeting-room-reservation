import 'react-calendar/dist/Calendar.css'
import "../css/CustomCalendar.css";
import styled from "styled-components";
import ReservationNav from "./ReservationNav";
import RegularOptions from "./RegularOptions";
import Calendar from "react-calendar";
import moment from "moment";
import TimeTable from "./TimeTable";
import { useState, useEffect, useReducer, useCallback } from "react";


// 날짜의 초기값
const initialDay = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
}

// 시간의 초기값
const initialTime = {
    startTime: 0,
    endTime: 0,
}

// selectedDa의 리듀서
const dayReducer = (state, action) => {
    switch (action.type) {
        case "YEAR": {
            return {
                ...state,
                year: action.year,
            }
        }

        case "MONTH": {
            return {
                ...state,
                month: action.month
            }

        }

        case "DATE": {
            return {
                ...state,
                date: action.date
            }

        }

        case "DAY": {
            return {
                ...state,
                day: action.day
            }

        }

        default: return state
    }
}

// selectedTime의 리듀서
const timeReducer = (state, action) => {
    switch (action.type) {
        case "START_TIME": {
            return {
                ...state,
                startTime: action.time,
            }
        }

        case "END_TIME": {
            return {
                ...state,
                endTime: action.time,
            }
        }

        case "RESET_TIME": {
            return {
                startTime: action.time,
                endTime: action.time,
            }
        }

        default: return state
    }
}

// 예약 관련 더미 데이터
const marks = [
    {
        reservedCount: 3,
        reservedDate: "15-04-2023"
    },
    {
        reservedCount: 2,
        reservedDate: "11-04-2023"
    },
    {
        reservedCount: 1,
        reservedDate: "12-04-2023"
    },
    {
        reservedCount: 3,
        reservedDate: "01-04-2023"
    },
    {
        reservedCount: 3,
        reservedDate: "25-04-2023"
    },
    {
        reservedCount: 4,
        reservedDate: "28-05-2023"
    },
];

// 선택된 날짜에대한 예약 시간
const reservedTime = [
    {
        // 2023년 4월 25일
        date: "2023-04-25",
        tList: [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    },
    {
        date: "2023-04-12",
        tList: [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    },
    {
        date: "2023-04-09",
        tList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    },
]

export default function Reservation() {
    const type = "일반 예약";

    // 예약 타입, 날짜 선택, 시간 선택의 상태를 다루는 변수들.
    const [isRegular, setIsRegular] = useState(false);
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [selectedTime, timeDispatch] = useReducer(timeReducer, initialTime);


    // 날짜가 선택되었을때 실행되는 함수
    const onCalendarHandler = (e) => {
        dayDispatch({
            type: "YEAR",
            year: e.getFullYear(),
        })

        dayDispatch({
            type: "MONTH",
            month: e.getMonth() + 1,
        })

        dayDispatch({
            type: "DATE",
            date: e.getDate(),
        })

        dayDispatch({
            type: "DAY",
            day: e.getDay(),
        })
    }


    // 컴포넌트가 마운트될때 예약 type을 확인해, 타입에 맞는 예약 화면을 보여줌.
    useEffect(() => {
        if (type === "정기 예약") {
            setIsRegular(true);
        }
        else {
            setIsRegular(false);
        }
    }, [])

     // 예약 건수에 따라 필요한 배경색상을 반환해줌.
     const reservedStatus = ({date, view}) => {

        // 3건 이상일때 색상 칠하기
        if (marks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount >= 3)) {
            return "heavy_reservation";
        }


        // 1~3건 사이일때의 색상 칠하기
        if (marks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount < 3 && x.reservedCount >= 1)) {
            return "middle_reservation";
        }
    }

    // TimeTable에서 선택된 시간 가져와서 반영하기
    const onTimeHandler = (start, end) => {
        // 시작 시간이 선택되지 않았을때
        if (!selectedTime.startTime) {
            timeDispatch({
                type: "START_TIME",
                time: start,
            })
        }

        // 끝나는 시간이 선택되지 않았을때
        if (!selectedTime.endTime) {
            timeDispatch({
                type: "END_TIME",
                time: end,
            })
        }

        // 선택된 시간이 모두 0일때. 리셋
        if (start === 0 && end === 0) {
            timeDispatch({
                type: "RESET_TIME",
                time: start,
            })
        }
    }


    // 예약 버튼이 클릭되었을때.
    const onBtnClicked = () => {

        const year = selectedDay.year.toString();
        const month = selectedDay.month < 10 ? "0" + selectedDay.month.toString() : selectedDay.month.toString();
        const date = selectedDay.date < 10 ? "0" + selectedDay.date.toString() : selectedDay.date.toString();
        const startTime = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();


        console.log("예약은 다음과 같습니다.");
        console.log(`${year}년 ${month}월 ${date}일`);
        console.log(`${startTime}시 부터 ${endTime}까지`);


        onReservedStatusHandler();
    }

    // 날짜에 맞는 tList 반환하기
    const onReservedStatusHandler = () => {
        const year = selectedDay.year.toString();
        const month = selectedDay.month < 10 ? "0" + selectedDay.month.toString() : selectedDay.month.toString();
        const date = selectedDay.date < 10 ? "0" + selectedDay.date.toString() : selectedDay.date.toString();

        // 날짜를 'YYYY-MM-DD" 형태로 변환
        const fullDate = `${year}-${month}-${date}`;

        // 날짜가 일치하는지 확인
        const findList = reservedTime.find(selectedDate => new Date(selectedDate.date).getTime() === new Date(fullDate).getTime());
        
        // 날짜가 일치할때
        if (findList) {
            return findList.tList;
        }
        // 날짜와 일치하는 경우가 없을때
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    };

    return (
        <ReservationContainer>
            <ReservationNav reserveType={type} message="언제 사용하실 건가요?" isRegular={isRegular}/>
            <Calendar onChange={onCalendarHandler} tileClassName={reservedStatus}/>
            {isRegular ? <RegularOptions month={selectedDay.month} date={selectedDay.date}></RegularOptions> : <></>}

            <TimeBox>
                <TimeTable onTimeHandler={onTimeHandler} reservedStatusList={onReservedStatusHandler()}/>
                <Ptag>사용하실 날짜와 시간을 선택해주세요</Ptag>
            </TimeBox>
            <button onClick={onBtnClicked}>예약하기</button>
        </ReservationContainer>

    );
}

const ReservationContainer = styled.div`
    height: 95vh;
    width: 100%;
    // max-height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TimeBox = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 10px 0px;
`

const Ptag = styled.p`
    color: #929292;
    margin-top: 7px;
`


