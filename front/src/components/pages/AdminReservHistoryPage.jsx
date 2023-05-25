import { useState, useEffect, useReducer } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { useSearchParams } from "react-router-dom";
import axios from 'axios'
import ReservationNav from "./ReservationNav";
import Calendar from "react-calendar";
import TimeTable from "./TimeTable";
import moment from "moment";

// 날짜의 초기값
const initialDay = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
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

export default function AdminReservHistoryPage() {
    const timeTable = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [reservedTime, setReservedTime] = useState([]);
    const [tmpMarks, setTmpMarks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

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

    // 예약 건수에 따라 필요한 배경색상을 반환해줌.
    const reservedStatus = ({ date, view }) => {
        // 3건 이상일때 색상 칠하기
        // if (marks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount >= 3)) {
        //     return "heavy_reservation";
        // }


        // // 1~3건 사이일때의 색상 칠하기
        // if (marks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount < 3 && x.reservedCount >= 1)) {
        //     return "middle_reservation";
        // }
        if (tmpMarks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount >= 3)) {
            return "heavy_reservation";
        }


        // 1~3건 사이일때의 색상 칠하기
        if (tmpMarks.find((x) => x.reservedDate === moment(date).format("DD-MM-YYYY") && x.reservedCount < 3 && x.reservedCount >= 1)) {
            return "middle_reservation";
        }

    }

    // 선택된 날짜의 예약 리스트를 반환하는 함수
    const onReservedStatusHandler = () => {
        return reservedTime;
    };

    // 서버로부터 선택된 날짜에 예약 시간 리스트를 받아옴
    useEffect(() => {
        // console.log(selectedDay.year, selectedDay.month, selectedDay.date);
        const timeCheckInfo = {
            year: selectedDay.year,
            month: selectedDay.month,
            day: selectedDay.date,
            roomId: searchParams.get('room_id')
        }
        axios.post('/reserve/today-time-check-room', { ...timeCheckInfo })
            .then((res) => {
                console.log(res.data);
                setReservedTime((state) => [...res.data]);
            })
            .catch((err) => {
                console.log("통신실패");
            })
    }, [selectedDay.date])

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <ReservationContainer>
                <ReservationNav message="언제 사용하실 건가요?" />
                <Calendar onChange={onCalendarHandler} tileClassName={reservedStatus} />
                <TimeBox>
                    <TimeTable reservedStatusList={onReservedStatusHandler()} />
                    <Ptag>해당 날짜의 예약 상태입니다.</Ptag>
                </TimeBox>
            </ReservationContainer>
        </>
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