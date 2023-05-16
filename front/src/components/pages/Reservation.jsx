import 'react-calendar/dist/Calendar.css'
import "../css/CustomCalendar.css";
import styled from "styled-components";
import ReservationNav from "./ReservationNav";
import TimeSelect from "./TimeSelect";
import TimeDialog from "./TimeDialog";
import Calendar from "react-calendar";
import moment from "moment";
import TimeTable from "./TimeTable";
import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSearchParams } from "react-router-dom";


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
    endTime: 1,
    rangeTime: 1,
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

        case "START_MINUTE": {
            return {
                ...state,
                startMinute: action.minute
            }
        }

        case "END_TIME": {
            return {
                ...state,
                endTime: action.time,
            }
        }

        case "END_MINUTE": {
            return {
                ...state,
                endMinute: action.minute
            }
        }

        case "RANGE_TIME": {
            return {
                ...state,
                rangeTime: action.time,
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
        reservedDate: "15-05-2023"
    },
    {
        reservedCount: 2,
        reservedDate: "11-05-2023"
    },
    {
        reservedCount: 1,
        reservedDate: "12-05-2023"
    },
    {
        reservedCount: 3,
        reservedDate: "01-05-2023"
    },
    {
        reservedCount: 3,
        reservedDate: "25-05-2023"
    },
    {
        reservedCount: 4,
        reservedDate: "28-05-2023"
    },
];

const timeTable = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const reserveTimeTable = ["1", "2", "3"];

export default function Reservation() {
    const type = "일반 예약";

    // 예약 타입, 날짜 선택, 시간 선택의 상태를 다루는 변수들.
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [selectedTime, timeDispatch] = useReducer(timeReducer, initialTime);
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomId, setRoodId] = useState();
    const [authority, setAuthority] = useState("");
    const [reservedTime, setReservedTime] = useState([]);
    const [tmpMarks, setTmpMarks] = useState([]);
    const navigate = useNavigate();

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                isRoomIdSelected(); // 회의실이 선택 여부를 다루는 함수
            })
            .catch((err) => {
                navigate('/loginpage')
            })
    }, []);

    // 사용자 권한을 얻어옴. UNI_STUDENT, PROFESSOR, POST_STUDENT, OFFICE
    useEffect(() => {
        axios.get(`/member/${sessionStorage.getItem('LoginID')}`)
            .then((res) => {
                setAuthority((state) => res.data.authority)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // 서버로부터 선택된 날짜에 예약 시간 리스트를 받아옴
    useEffect(() => {
        // console.log(selectedDay.year, selectedDay.month, selectedDay.date);
        axios.get('/reserve/today-time-check', {params: {year: selectedDay.year, month: selectedDay.month, day: selectedDay.date}})
            .then((res) => {
                // console.log(res.data);
                setReservedTime((state) => [...res.data]);
            })
            .catch((err) => {
                console.log("통신실패");
            })
    }, [selectedDay.date])

    // 의존성은 임시로 월별을 클릭했을때 변경되도록 함. -> 달력을 클릭했을때 바뀌는 걸로 수정해야함.
    useEffect(() => {
        createMonthReservedCount();
    }, [selectedDay.month])

    // 회의실이 선택되지 않았을때 실행되는 함수
    const isRoomIdSelected = () => {
        const selectedRoomId = searchParams.get('room_id');
        if (selectedRoomId === null || selectedRoomId === "null") {
            alert('회의실을 선택해주세요');
            navigate('/selectmeetingroom');
        }
        else {
            setRoodId(selectedRoomId);
        }
    }

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
            for (let day=1; day<=lastMonthDay ; day++) {
                // console.log(selectedDay.year, currentMonth, day)
                // 서버에 해당 날짜의 예약건수 요청.
                axios.get('/reserve/today-reserve-cnt', {params: {year: selectedDay.year, month: currentMonth, day:day}})
                    .then((res) => {
                        const cntData = {
                            reservedCount: res.data,
                            reservedDate: `${day}-${currentMonth}-${selectedDay.year}`
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
     const reservedStatus = ({date, view}) => {
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
        const startMinute = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        const endMinute = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();

        // 예약된 시간이 겹치지 않는것을 확인했다면
        // const isOverlap = reservationOverlapHandler(selectedTime.startTime, selectedTime.endTime);
        // isOverlap ? alert("해당 시간대에는 이미 예약이 있습니다.") : makeReservation(year, month, date, day, startTime, endTime);
        makeReservation(year, month, date, day, startTime, startMinute, endTime, endMinute);
    }

    // 지난 날짜는 선택할 수 없도록 그리고 오늘로부터 2개월 뒤에는 선택할 수 없도록
    const tileDisabledHandler = ({date, view}) => {
        // 오늘로부터 지난날들은 비활성화
        if (moment(date).format('MM-DD') < moment(new Date()).format('MM-DD')) {
            return true
        }

        // 학생인 경우 2일전 예약 가능.
        if (authority === "UNI_STUDENT") {
            if (moment(date).format('MM-DD') > moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)).format('MM-DD')) {
                return true
            }
            
        }

        // 대학원은 일주일전 예약 가능.
        else if(authority === "POST_STUDENT") {
            if (moment(date).format('MM-DD') > moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)).format('MM-DD')) {
                return true
            }
        }

        // 교수, 교직원 -> 무제한

        // 오늘을 기준으로 1개월뒤 날짜들은 비활성화 (단순히 '달'을 기준으로 할거라면 'MM' 사용) // 2개월 뒤로할려면  new Date().getMonth() + 1
        // if (moment(date).format('MM') > moment(new Date(new Date().getFullYear(), new Date().getMonth())).format('MM-DD')) {
        //     return true
        // }
        // if (moment(date).format('MM-DD') > moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())).format('MM-DD')) {
        //     return true
        // }
    }

    const makeReservation = (year, month, date, day, startTime, startMinute, endTime, endMinute) => {
        console.log(startTime, endTime);
        const reservationFromInfo = `${year}-${month}-${date}T${startTime}:${startMinute}Z`;
        const reservationToInfo = `${year}-${month}-${date}T${endTime}:${endMinute}Z`;
    
        console.log(new Date(reservationFromInfo));
        console.log(new Date(reservationToInfo));

        const reservationInfo = {
            start: new Date(reservationFromInfo),
            end: new Date(reservationToInfo),
            status: "RESERVED",
            regular: false,
        }   

        console.log(reservationInfo);
        axios.post('/reserve/', {...reservationInfo}, {params: {room_id: roomId}})
            .then((res) => {
                console.log(res);
                alert(`${year}년 ${month}월 ${date}일 ${startTime}시 부터 ${endTime}까지 예약을 완료했습니다`);
                navigate(`/sharereservationpage?year=${year}&month=${month}&date=${date}&day=${day}&startTime=${startTime}&endTime=${endTime}&room_id=${roomId}`)
            })
            .catch((err) => {
                console.log("ERRR");
                alert(`${err.response.data.message}`);
            })
        onReservedStatusHandler();
    }

    // 선택된 날짜의 예약 리스트를 반환하는 함수
    const onReservedStatusHandler = () => {
        return reservedTime;
    };

    // 예약 시작시간
    const onStartTimeSelectHandler = (hour, minute) => {
        console.log(`선택된 시작시간은 ${hour}시 ${minute}분`);
        // const start = parseInt(e.target.value);
        timeDispatch({
            type: "START_TIME",
            time: hour,
        })
        timeDispatch({
            type: "START_MINUTE",
            minute: minute,
        })
    }
    // 예약 종료시간
    const onEndTimeSelectHandler = (hour, minute) => {
        console.log(`선택된 종료시간은 ${hour}시 ${minute}분`);
        // const start = parseInt(e.target.value);
        timeDispatch({
            type: "END_TIME",
            time: hour,
        })
        timeDispatch({
            type: "END_MINUTE",
            minute: minute,
        })
    }

    // 예약 시작 시간
    // const onTimeSelectHandler = (e) => {
    //     const start = parseInt(e.target.value);
    //     timeDispatch({
    //         type: "START_TIME",
    //         time: start,
    //     })
    //     onReserveTimeHandler(start, selectedTime.rangeTime);
    // }
    // // 예약 종료 시간
    // const onReserveTimeHandler = (s, e) => {
    //     const end = (s + e);
    //     timeDispatch({
    //         type: "END_TIME",
    //         time: end,
    //     })
    // }

    // // 예약 간격 시간
    // const onRangeTimeHandler = (e) => {
    //     const range = parseInt(e.target.value);
    //     timeDispatch({
    //         type: "END_TIME",
    //         time: range,
    //     })
    //     onReserveTimeHandler(selectedTime.startTime, range);
    // }

    return (
        <ReservationContainer>
            <ReservationNav reserveType={type} message="언제 사용하실 건가요?"/>
            <Calendar onChange={onCalendarHandler} tileClassName={reservedStatus} tileDisabled={tileDisabledHandler}/>

            <TimeBox>
                <TimeTable reservedStatusList={onReservedStatusHandler()}/>
                <Ptag>해당 날짜의 예약 상태입니다.</Ptag>
            </TimeBox>
            <ReservedInfoDiv>
                <TimeDialog selectType="시작시간 선택하기" onTimeSelectHandler = {onStartTimeSelectHandler}/>
                <TimeDialog selectType="끝나는 시간 선택하기" onTimeSelectHandler = {onEndTimeSelectHandler}/>
                {/* <TimeSelect onSelectHandler={onTimeSelectHandler} selectData={timeTable} dataType={"시 부터"}></TimeSelect>
                <TimeSelect onSelectHandler={onRangeTimeHandler} selectData={reserveTimeTable} dataType={"시간"}></TimeSelect> */}
            </ReservedInfoDiv>
            <ReserveBtn onClick={onBtnClicked}>예약하기</ReserveBtn>
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

const ReservedInfoDiv = styled.div`
    display: flex;
    justify-content: space-around;

    margin-bottom: 15px;

    width: 100%;
    max-width: 500px;
`

const ReserveBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-size: 15px;

    width: 130px;
    height: 30px;
    background-color: #0096c7;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 15px;
`

