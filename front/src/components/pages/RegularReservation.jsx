import 'react-calendar/dist/Calendar.css'
import "../css/CustomCalendar.css";
import styled from "styled-components";
import ReservationNav from "./ReservationNav";
import TimeSelect from "./TimeSelect";
import TimeDialog from "./TimeDialog";
import RegularOptions from "./RegularOptions";
import Calendar from "react-calendar";
import moment from "moment";
import TimeTable from "./TimeTable";
import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';


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
    startMinute: 0,
    endTime: 1,
    endMinute: 0,
    rangeTime: 1,
}

// 정기예약 정보 초기값
const initialRegular = {
    dayWeekMonth: "daily",
    dayRepeat: 1,
    count: 1,
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
                rangeTime: 1,
            }
        }

        default: return state
    }
}

// 정기 예약 정보를 담는 리듀서
const regularInfoReducer = (state, action) => {
    switch(action.type) {
        case "R_TYPE": {
            return {
                ...state,
                dayWeekMonth: action.dayWeekMonth
            }
        }

        case "REPEAT": {
            return {
                ...state,
                dayRepeat: action.dayRepeat,
            }
        }

        case "C_TYPE": {
            return {
                ...state,
                count: action.count,
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

const timeTable = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const reserveTimeTable = ["1", "2", "3"];

export default function RegularReservations() {
    const type = "정기 예약";

    // 예약 타입, 날짜 선택, 시간 선택의 상태를 다루는 변수들.
    const [selectedDay, dayDispatch] = useReducer(dayReducer, initialDay);
    const [regularInfo, regularDispatch] = useReducer(regularInfoReducer, initialRegular);
    const [selectedTime, timeDispatch] = useReducer(timeReducer, initialTime);
    const [reservedTime, setReservedTime] = useState([]);
    const [isDayReservation, setIsDayReservation] = useState(true);
    const [overlap, setOverLap] = useState(0);
    const [authority, setAuthority] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomId, setRoomId] = useState();
    const [tmpMarks, setTmpMarks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                // console.log("로그인 되어있습니다")
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
        // console.log(selectedDay.year, selectedDay.month, selectedDay.date, '선택한 날짜의 예약 시간 정보를 가져옵니다');
        // console.log(selectedDay.year, selectedDay.month, selectedDay.date);
        const timeCheckInfo = {
            year: selectedDay.year,
            month: selectedDay.month,
            day: selectedDay.date,
            roomId: searchParams.get('room_id')
        }
        axios.post('/reserve/today-time-check-room', {...timeCheckInfo})
            .then((res) => {
                // console.log(res.data);
                setReservedTime((state) => [...res.data]);
            })
            .catch((err) => {
                console.log("통신실패");
            })
        
        // axios.get('/reserve/today-time-check', {params: {year: selectedDay.year, month: selectedDay.month, day: selectedDay.date}})
        //     .then((res) => {
        //         // console.log(res.data);
        //         setReservedTime((state) => [...res.data]);
        //     })
        //     .catch((err) => {
        //         console.log("통신실패");
        //     })
    }, [selectedDay.date])

    // 의존성은 임시로 월별을 클릭했을때 변경되도록 함. -> 달력을 클릭했을때 바뀌는 걸로 수정해야함.
    useEffect(() => {
        // console.log("카운트 불러오기");
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
            setRoomId(selectedRoomId);
        }
    }


    // 월별 예약건수를 서버에 요청해 만드는 함수.
    const createMonthReservedCount = () => {
        setTmpMarks((state) => []);
        
        let idx = 2;
        let ttt = 0;
        while (idx > 0) {
            const currentMonth = selectedDay.month + ttt < 10 ? "0" + (selectedDay.month + ttt).toString() : (selectedDay.month + ttt).toString();
            const todayDay = new Date().getDate();
            const lastMonthDay = new Date(selectedDay.year, selectedDay.month - 1, 0).getDate();
            for (let day=1; day<=lastMonthDay ; day++) {
                // 서버에 해당 날짜의 예약건수 요청.
                const dayString = day < 10 ? "0" + day.toString() : day.toString();
                const requestDayInfo = {
                    year: selectedDay.year.toString(),
                    month: selectedDay.month.toString(),
                    day: dayString,
                }

                axios.post('/reserve/today-reserve-cnt-room', {...requestDayInfo})
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
    // const reservationOverlapHandler = (startTime, endTime) => {
    //     // 기존 예약시간 리스트를 예약된 시간으로 나눠서 새로운 배열 반환. -> 해당 배열에 1이 하나라도 있다면 초기화
    //     const overlapArray = reservedTime.slice(startTime, endTime + 1)
    //     return overlapArray.find((el) => el === 1);
    // }

    const reservationOverlapHandler = async (year, month, date, day, startTime, endTime) => {
        // 기존 예약시간 리스트를 예약된 시간으로 나눠서 새로운 배열 반환. -> 해당 배열에 1이 하나라도 있다면 초기화
        // console.log(`${year}년 ${month}월 ${date}일 예약을 진행합니다`);
        return new Promise((resolve, reject) => {
            axios.get('/reserve/today-time-check', {params: {year: year, month: month, day: date}})
            .then(async (res) => {
                const overlapArray = await res.data.slice(startTime, endTime + 1);
                const isOverlap = await overlapArray.find((el) => el === 1);
                await resolve(isOverlap);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    // 예약 버튼이 클릭되었을때.
    const onBtnClicked = () => {
        // 주간 정기예약
        if (regularInfo.dayWeekMonth === "weekly") {
            for (let day=0 ; day <= regularInfo.count*7; day += 7) {
                onWeekRegularHandler(day);
            }
        }
        // 월간 정기예약
        else if (regularInfo.dayWeekMonth === "monthly") {
            let yearR = selectedDay.year;
            let monthR = selectedDay.month;
            let dateR = selectedDay.date;
            let dayR = selectedDay.day;

            const selecDay = translateIntToString(yearR, monthR, dateR, dayR);

            makeReservation(selecDay.year, selecDay.month, selecDay.date, dayR, selecDay.startTime, selecDay.startMinute, selecDay.endTime, selecDay.endMinute);
            for (let cnt=0 ; cnt < regularInfo.count; cnt++) {
                const nextRegular = onMonthRegularHandler(yearR, monthR, dateR, dayR);
                yearR = nextRegular.yearR;
                monthR = nextRegular.monthR;
                dateR = nextRegular.dateR;
                dayR = nextRegular.dayR;
            }
        }
        // 일간 정기예약
        else {
            console.log("일간 정기예약");
            onRegularDayReservation(regularInfo.dayRepeat, regularInfo.count);
        }
    }

    const onRegularDayReservation = (dayRepeat, count) => {

        const todayYear = selectedDay.year;
        const todayMonth = selectedDay.month;
        let todayDate = selectedDay.date;
        const todayDay = selectedDay.day;

        let day = parseInt(dayRepeat);

        for (let i=0 ; i<=count ; i++) {
            if (i === 0) {
                const selecDay = translateIntToString(todayYear, todayMonth, todayDate, todayDay);
                makeReservation(selecDay.year, selecDay.month, selecDay.date, todayDay, selecDay.startTime, selecDay.startMinute, selecDay.endTime, selecDay.endMinute);
                todayDate += day
            }
            else {
                const dayRegular = new Date(todayYear, todayMonth-1, todayDate);
                console.log(dayRegular);
                const yearString = dayRegular.getFullYear().toString();
                const monthString = (dayRegular.getMonth() + 1 < 10) ? "0" + (dayRegular.getMonth()+1).toString() : (dayRegular.getMonth()+1).toString();
                const dateString = (dayRegular.getDate()) < 10 ? "0" + dayRegular.getDate().toString() : dayRegular.getDate().toString();
                const dayString = dayRegular.getDay();
                const startTimeR = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
                const startMinuteR = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
                const endTimeR = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
                const endMinuteR = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();
                makeReservation(yearString, monthString, dateString, dayString, startTimeR, startMinuteR, endTimeR, endMinuteR);
                
                todayDate += day;
            }
        }

    }

    const overLapHandler = (year, month, date) => {
        alert(`다른 날짜에 중복된 시간이 존재합니다. 예약을 취소합니다 ${year} ${month} ${date}`);
        // window.location.replace('/regularreservation');
    }

    const onMonthRegularHandler = (yearR, monthR, dateR, dayR) => {
        console.log("월간 정기예약");
        // console.log(new Date(selectedDay.year, selectedDay.month, 0).getDate());
        // console.log(new Date(selectedDay.year, selectedDay.month, 0));
            
        // 해당 월의 가장 끝
        const lastDay = new Date(yearR, monthR, 0).getDate();
        // 기본 가중치
        let wei = 4;

        // 가중치를 더해도 월이 동일하다면 가중치 7을 더해줌.
        if (dateR + 28 <= lastDay && dateR <= 5) {
            // console.log("가중치를 5로 만듭니다");
            wei = 5;
        }

        const tmp = findMonthRegularDate(7*wei, yearR, monthR, dateR, dayR);
        const yearString = tmp.getFullYear().toString();
        const monthString = (tmp.getMonth() + 1) < 10 ? "0" + (tmp.getMonth() + 1).toString() : (tmp.getMonth() + 1).toString();
        const dateString = (tmp.getDate()) < 10 ? "0" + tmp.getDate().toString() : tmp.getDate().toString();
        const dayString = dayR;
        const startTimeR = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const startMinuteR = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
        const endTimeR = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        const endMinuteR = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();
        // console.log(`${yearR}년 ${monthR}월 ${dateR}일 정기 예약 진행`);

        makeReservation(yearString, monthString, dateString, dayString, startTimeR, startMinuteR, endTimeR, endMinuteR);

        return {
            yearR: tmp.getFullYear(),
            monthR: tmp.getMonth() + 1,
            dateR: tmp.getDate(),
            dayR: dayR,
        }
    }

    const onWeekRegularHandler = async (day) => {
        // 정기 날짜를 받아와서
        const tmp = findWeekRegularDate(day);

        // 서버에 알맞은 형태로 넘기기 위해 변환하는 작업을 거친다.
        const yearT = tmp.getFullYear().toString();
        const monthT = (tmp.getMonth() + 1) < 10 ? "0" + (tmp.getMonth() + 1).toString() : (tmp.getMonth() + 1).toString();
        const dateT = (tmp.getDate()) < 10 ? "0" + tmp.getDate().toString() : tmp.getDate().toString();
        const dayT = selectedDay.day;
        const startTime = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const startMinute = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        const endMinute = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();
        
        makeReservation(yearT, monthT, dateT, dayT, startTime, startMinute, endTime, endMinute);

        // console.log(`${startTime}시 부터, ${endTime}시 까지`);
        // await reservationOverlapHandler(yearT, monthT, dateT, dayT, selectedTime.startTime, selectedTime.endTime)
        //     .then((res) => {
        //         res ? overLapHandler(yearT, monthT, dateT) : makeReservation(yearT, monthT, dateT, dayT, startTime, startMinute, endTime, endMinute);
        //     })
        // console.log(`${yearT}년 ${monthT}월 ${dateT}일 중복여부: ${overlap}`);
        // await makeReservation(yearT, monthT, dateT, dayT, selectedTime.startTime, selectedTime.endTime);
    }

    // [월] 자동으로 날짜가 계산되어 반환해주는 함수.
    const findMonthRegularDate = (addDay, yearR, monthR, dateR, dayR) => {
        const year = yearR.toString();
        const month = monthR < 10 ? "0" + monthR.toString() : monthR.toString();
        const date = (dateR + addDay) < 10 ? "0" + (dateR + addDay).toString() : (dateR + addDay).toString();
        return new Date(year, month-1, date);
    }

    // [주] 자동으로 날짜가 계산되어 반환해주는 함수.
    const findWeekRegularDate = (addDay) => {
        const year = selectedDay.year.toString();
        const month = selectedDay.month < 10 ? "0" + selectedDay.month.toString() : selectedDay.month.toString();
        const date = (selectedDay.date + addDay) < 10 ? "0" + (selectedDay.date + addDay).toString() : (selectedDay.date + addDay).toString();

        return new Date(year, month-1, date);
    }

    // 정수형으로 표현된 날짜를 문자로 바꿔줌
    const translateIntToString = (yearR, monthR, dateR) => {
        const year = yearR.toString();
        const month = monthR < 10 ? "0" + monthR.toString() : monthR.toString();
        const date = dateR < 10 ? "0" + dateR.toString() : dateR.toString();
        const startTime = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const startMinute = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        const endMinute = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();

        return {year,  month, date, startTime, startMinute, endTime, endMinute}
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

        // 오늘을 기준으로 2개월뒤 날짜들은 비활성화 (단순히 '달'을 기준으로 할거라면 'MM' 사용)
        // if (moment(date).format('MM') > moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).format('MM-DD')) {
        //     return true
        // }
        // // 오늘을 기준으로 2개월뒤 날짜들은 비활성화 (단순히 '달'을 기준으로 할거라면 'MM' 사용)
        // if (moment(date).format('MM-DD') > moment(new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())).format('MM-DD')) {
        //     return true
        // }
    }

    const ShowSelectedStartTime = () => {
        const startTime = selectedTime.startTime < 10 ? "0" + selectedTime.startTime.toString() : selectedTime.startTime.toString();
        const startMinute = selectedTime.startMinute < 10 ? "0" + selectedTime.startMinute.toString() : selectedTime.startMinute.toString();
        const isAmOrPm = selectedTime.startTime < 12 ? "AM" : "PM";

        return `${startTime}:${startMinute} ${isAmOrPm}`
    }
    const ShowSelectedEndTime = () => {
        const endTime = selectedTime.endTime < 10 ? "0" + selectedTime.endTime.toString() : selectedTime.endTime.toString();
        const endMinute = selectedTime.endMinute < 10 ? "0" + selectedTime.endMinute.toString() : selectedTime.endMinute.toString();
        const isAmOrPm = selectedTime.endTime < 12 ? "AM" : "PM";

        return `${endTime}:${endMinute} ${isAmOrPm}`
    }

    const makeReservation = (year, month, date, day, startTime, startMinute, endTime, endMinute) => {
        // console.log(startTime, endTime);
        const reservationFromInfo = `${year}-${month}-${date}T${startTime}:${startMinute}Z`;
        const reservationToInfo = `${year}-${month}-${date}T${endTime}:${endMinute}Z`;
        
        console.log(`${year}-${month}-${date} 예약 완료`);

        // console.log(reservationFromInfo);
        // console.log(reservationToInfo);

        console.log(new Date(reservationFromInfo));
        console.log(new Date(reservationToInfo));

        // console.log("정기예약 정보");
        // console.log(regularInfo.dayWeekMonth, regularInfo.count);


        const reservationInfo = {
            start: new Date(reservationFromInfo),
            end: new Date(reservationToInfo),
            status: "RESERVED",
            regular: true,
        }  
        
        console.log("예약 완료");
        axios.post('/reserve/', {...reservationInfo}, {params: {room_id: roomId}})
            .then((res) => {
                // alert(`${year}년 ${month}월 ${date}일 ${startTime}시 부터 ${endTime}까지 예약을 완료했습니다`);
                const reservationId = res.data;
                navigate(`/showregularreservation?reservation_id=${reservationId}&repeat_type=${regularInfo.dayWeekMonth}&repeat_count=${regularInfo.dayRepeat}`)
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

    // 예약 시작시간
    const onStartTimeSelectHandler = (morning, hour, minute) => {
        if (morning) {
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
        else {
            console.log(`선택된 시작시간은 ${hour+12}시 ${minute}분`);
            // const start = parseInt(e.target.value);
            timeDispatch({
                type: "START_TIME",
                time: hour+12,
            })
            timeDispatch({
                type: "START_MINUTE",
                minute: minute,
            })
        }
    }
    // 예약 종료시간
    const onEndTimeSelectHandler = (morning, hour, minute) => {
        if (morning) {
            console.log(`선택된 종료시간은 ${hour+12}시 ${minute}분`);
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
        else {
            console.log(`선택된 종료시간은 ${hour}시 ${minute}분`);
            // const start = parseInt(e.target.value);
            timeDispatch({
                type: "END_TIME",
                time: hour + 12,
            })
            timeDispatch({
                type: "END_MINUTE",
                minute: minute,
            })
        }
    }



    // 일간, 주간, 월간 선택 가져오는 함수
    const onRegularTypeHandler = (e) => {
        const dayType = e.target.value;
        
        dayType === "day" ? setIsDayReservation(true) : setIsDayReservation(false);
        
        regularDispatch({
            type: "R_TYPE",
            dayWeekMonth: dayType,
        })
    }

    // 일간 정기예약시 n일을 가져오는 함수
    const onRegularDay = (e) => {
        const dayRepeat = e.target.value;

        regularDispatch({
            type: "REPEAT",
            dayRepeat: dayRepeat,
        })
    }

    // 일간, 주간, 월간의 횟수를 가져오는 함수
    const onRegularCountHandler = (e) => {
        console.log(e.target.value);
        const count = e.target.value;
        regularDispatch({
            type: "C_TYPE",
            count: count,
        })
    }

    return (
        <ReservationContainer>
            <ReservationNav reserveType={type} message="언제 사용하실 건가요?"/>
            <Calendar onChange={onCalendarHandler} tileClassName={reservedStatus} tileDisabled={tileDisabledHandler}/>
            <RegularOptions month={selectedDay.month} date={selectedDay.date} isDayReservation={isDayReservation} onRegularDay={onRegularDay} onRegularTypeHandler={onRegularTypeHandler} onRegularCountHandler={onRegularCountHandler}></RegularOptions>

            <TimeBox>
                <TimeTable reservedStatusList={onReservedStatusHandler()}/>
                <Ptag>해당 날짜의 예약 상태입니다.</Ptag>
            </TimeBox>

            <ReservedInfoDiv>
                <TimeSelectDiv>
                    <label htmlFor="">{ShowSelectedStartTime()}</label>
                    <TimeDialog selectType="시작시간 선택하기" onTimeSelectHandler = {onStartTimeSelectHandler}/>
                </TimeSelectDiv>
                <TimeSelectDiv>
                    <label htmlFor="">{ShowSelectedEndTime()}</label>
                    <TimeDialog selectType="끝나는 시간 선택하기" onTimeSelectHandler = {onEndTimeSelectHandler}/>
                </TimeSelectDiv>
                {/* <TimeSelect onSelectHandler={onTimeSelectHandler} selectData={timeTable} dataType={"시 부터"}></TimeSelect>
                <TimeSelect onSelectHandler={onRangeTimeHandler} selectData={reserveTimeTable} dataType={"시간"}></TimeSelect> */}
            </ReservedInfoDiv>
            
            
            <ReserveBtn onClick={onBtnClicked}>예약하기</ReserveBtn>
        </ReservationContainer>

    );
}

const TimeSelectDiv= styled.div`
    font-size: 15px;
    font-weight: bold;

    text-align: center;
`

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
    max-width: 400px;
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