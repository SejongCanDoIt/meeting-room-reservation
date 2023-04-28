import 'react-calendar/dist/Calendar.css'
import "../css/CustomCalendar.css";
import styled from "styled-components";
import ReservationNav from "./ReservationNav";
import RegularOptions from "./RegularOptions";
import Calendar from "react-calendar";
import moment from "moment";
import TimeTable from "./TimeTable";
import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';


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


export default function Reservation() {
    const type = "일반 예약";

    // 예약 타입, 날짜 선택, 시간 선택의 상태를 다루는 변수들.
    const [isRegular, setIsRegular] = useState(false);
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [selectedTime, timeDispatch] = useReducer(timeReducer, initialTime);

    const [reservedTime, setReservedTime] = useState([]);

    const navigate = useNavigate();

    // 로그인되어있는지 확인해서 안되어있다면 로그인하도록 유도
    useEffect(() => {
        //  서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                if (!res.data) {
                    navigate('/loginPage');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // 서버로부터 선택된 날짜에 예약 시간 리스트를 받아옴
    useEffect(() => {
        console.log(selectedDay.year, selectedDay.month, selectedDay.date);
        axios.get('/reserve/today-time-check', {params: {year: selectedDay.year, month: selectedDay.month, day: selectedDay.date}})
            .then((res) => {
                // console.log(res.data);
                setReservedTime((state) => [...res.data]);
            })
            .catch((err) => {
                console.log("통신실패");
            })
    }, [selectedDay.date])

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
        if (start !== -1) {
            timeDispatch({
                type: "START_TIME",
                time: start,
            })
        }

        // 끝나는 시간이 선택되지 않았을때
        if (end !== -1) {
            timeDispatch({
                type: "END_TIME",
                time: end,
            })
        }

        // 선택된 시간이 모두 -1일때. 리셋
        if (start === -1 && end === -1) {
            timeDispatch({
                type: "RESET_TIME",
                time: start,
            })
        }
    }

    // 사용자가 선택한 시간이 미리 예약된 시간과 겹치는 경우를 다루는 함수
    const reservationOverlapHandler = (startTime, endTime) => {
        // 기존 예약시간 리스트를 예약된 시간으로 나눠서 새로운 배열 반환. -> 해당 배열에 1이 하나라도 있다면 초기화
        const overlapArray = reservedTime.slice(startTime, endTime + 1)
        return overlapArray.find((el) => el === 1);
    }

    // 예약 버튼이 클릭되었을때.
    const onBtnClicked = () => {
        const year = selectedDay.year.toString();
        const month = selectedDay.month < 10 ? "0" + selectedDay.month.toString() : selectedDay.month.toString();
        const date = selectedDay.date < 10 ? "0" + selectedDay.date.toString() : selectedDay.date.toString();
        const day = selectedDay.day;
        const startTime = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        // console.log("예약은 다음과 같습니다.");
        // console.log(`${year}년 ${month}월 ${date}일`);
        // console.log(`${startTime}시 부터 ${endTime}까지`);

        // 예약된 시간이 겹치지 않는것을 확인했다면
        const isOverlap = reservationOverlapHandler(selectedTime.startTime, selectedTime.endTime);
        isOverlap ? alert("해당 시간대에는 이미 예약이 있습니다.") : makeReservation(year, month, date, day, startTime, endTime);
    }

    const makeReservation = (year, month, date, day, startTime, endTime) => {
        const reservationFromInfo = `${year}-${month}-${date}T${startTime}:00Z`;
        const reservationToInfo = `${year}-${month}-${date}T${endTime}:00Z`;
    
        console.log(new Date(reservationFromInfo));
        console.log(new Date(reservationToInfo));

        const reservationInfo = {
            start: new Date(reservationFromInfo),
            end: new Date(reservationToInfo),
            status: "RESERVED",
            regular: false,
        }   

        console.log(reservationInfo);
        axios.post('/reserve/', {...reservationInfo}, {params: {room_id: 835}})
            .then((res) => {
                console.log(res);
                alert(`${year}년 ${month}월 ${date}일 ${startTime}시 부터 ${endTime}까지 예약을 완료했습니다`);
                navigate(`/ShareReservationPage?year=${year}&month=${month}&date=${date}&day=${day}&startTime=${startTime}&endTime=${endTime}`)
            })
            .catch((err) => {
                alert(`${err.response.data.message}`);
            })
        onReservedStatusHandler();
    }

    // 선택된 날짜의 예약 리스트를 반환하는 함수
    const onReservedStatusHandler = () => {
        return reservedTime;
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



