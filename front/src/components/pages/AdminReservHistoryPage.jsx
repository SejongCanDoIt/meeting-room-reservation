import { useState, useEffect, useReducer } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { useSearchParams } from "react-router-dom";
import axios from 'axios'
import ReservationNav from "./ReservationNav";
import Calendar from "react-calendar";
import AdminTimeTable from "./AdminTimeTable";
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
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [reservedTime, setReservedTime] = useState([]);
    const [reservations, setReservations] = useState([]);
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

    // 의존성은 임시로 월별을 클릭했을때 변경되도록 함. -> 달력을 클릭했을때 바뀌는 걸로 수정해야함.
    useEffect(() => {
        createMonthReservedCount();
    }, [selectedDay.month])

    // 월별 예약건수를 서버에 요청해 만드는 함수.
    const createMonthReservedCount = async () => {
        setTmpMarks((state) => []);

        // const currentMonth = selectedDay.month < 10 ? "0" + selectedDay.month.toString() : selectedDay.month.toString();
        // const todayDay = new Date().getDate();
        // const lastMonthDay = new Date(selectedDay.year, selectedDay.month - 2, 0).getDate();
        // console.log(currentMonth);

        let idx = 2;
        let ttt = 0;
        while (idx > 0) {
            const currentMonth = selectedDay.month + ttt < 10 ? "0" + (selectedDay.month + ttt).toString() : (selectedDay.month + ttt).toString();
            const todayDay = new Date().getDate();
            const lastMonthDay = new Date(selectedDay.year, selectedDay.month - 1, 0).getDate();
            for (let day = 1; day <= lastMonthDay; day++) {
                // 서버에 해당 날짜의 예약건수 요청.
                const dayString = day < 10 ? "0" + day.toString() : day.toString();
                const requestDayInfo = {
                    year: selectedDay.year.toString(),
                    month: selectedDay.month.toString(),
                    day: dayString,
                }

                axios.post('/reserve/today-reserve-cnt-all', { ...requestDayInfo })
                    .then((res) => {
                        const cntData = {
                            reservedCount: res.data,
                            reservedDate: `${dayString}-${currentMonth}-${selectedDay.year}`
                        }
                        setTmpMarks((state) => [...state, cntData])
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }
            idx -= 1
            ttt += 1
        }
        // for (let day=1; day<=30 ; day++) {
        //     console.log(selectedDay.year, currentMonth, day)
        //     // 서버에 해당 날짜의 예약건수 요청.
        //     axios.get('/reserve/today-reserve-cnt', {params: {year: selectedDay.year, month: currentMonth, day:day}})
        //         .then((res) => {
        //             const cntData = {
        //                 reservedCount: res.data,
        //                 reservedDate: `${day}-${currentMonth}-${selectedDay.year}`
        //             }
        //             setTmpMarks((state) => [...state, cntData])
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })

        // }
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
        }
        axios.post('/reserve/get-reserve-list-all', { ...timeCheckInfo })
            .then((res) => {
                console.log(res.data);
                setReservations(res.data);
            })
            .catch((err) => {
                console.log("통신실패");
            })

        axios.post('/reserve/today-time-check', { ...timeCheckInfo })
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
            <ReservationHistory>
                <ReservationContainer>
                    <Header>
                        <h1>예약 내역</h1>
                    </Header>
                    <DayInfo>
                        <LeftInfo>
                            <StyledCalendar onChange={onCalendarHandler} tileClassName={reservedStatus} />
                            <TimeBox>
                                <AdminTimeTable reservedStatusList={onReservedStatusHandler()} />
                                <Ptag>해당 날짜의 예약 상태입니다.</Ptag>
                            </TimeBox>
                        </LeftInfo>
                        <RightInfo>
                            {reservations.map(reservation => {
                                const startDate = new Date(reservation.start);
                                const endDate = new Date(reservation.end);
                                const startString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`;
                                const endString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`;

                                let reservationStatus;
                                switch (reservation.status) {
                                    case "RESERVED":
                                        reservationStatus = "예약됨";
                                        break;
                                    case "FINISHED":
                                        reservationStatus = "종료됨";
                                        break;
                                    case "CANCELED":
                                        reservationStatus = "취소됨";
                                        break;
                                    default:
                                        reservationStatus = "상태 미지정";
                                }
                                return (
                                    <ReservationItem>
                                        <div><b>예약 종류:</b> {reservation.regular ? "정기 예약" : "일반 예약"}</div>
                                        <div><b>예약 ID:</b> {reservation.reservation_id}</div>
                                        <div><b>예약자 학번:</b> {reservation.member_sno}</div>
                                        <div><b>노쇼 여부:</b> {reservation.noShowCheck ? "있음" : "없음"}</div>
                                        <div><b>예약 시작 시간:</b> {startString}</div>
                                        <div><b>예약 종료 시간:</b> {endString}</div>
                                        <div><b>회의실 ID:</b> {reservation.room_id}</div>
                                        <div><b>예약 상태:</b> <Status status={reservation.status}>{reservationStatus}</Status></div>
                                    </ReservationItem>
                                );
                            })}
                        </RightInfo>
                    </DayInfo>
                </ReservationContainer>
            </ReservationHistory>
        </>
    );
}

const ReservationHistory = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const ReservationContainer = styled.div`
    padding: 20px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DayInfo = styled.div`
    display: flex;
    justify-content: space-between;
    height: 70vh;
`;

const LeftInfo = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledCalendar = styled(Calendar)`
    width: 100%;
    height: 70%;
    max-width: 100%;
    background: white;
    border-radius: 10px;
    font-size: 20px;
    line-height: 1.2em;
    color: #000000;

    & .react-calendar__navigation__label {
        font-size: 20px;
    }

    & .react-calendar__tile {
        height: 50px;
        font-size: 20px;
    }

    & .react-calendar__tile--active {
        background: #6fa8dc;
        color: white;
    }

    & .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }
`;

const TimeBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
`

const Ptag = styled.p`
    color: #929292;
    margin-top: 7px;
`

const RightInfo = styled.div`
    flex: 1;
    margin: 0 20px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ReservationItem = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    background: white;
`;

const Status = styled.span`
    color: ${props => props.status === 'RESERVED' ? 'green' : props.status === 'FINISHED' ? 'red' : 'black'};
`;