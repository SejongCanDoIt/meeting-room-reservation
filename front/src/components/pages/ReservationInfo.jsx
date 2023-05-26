import styled from "styled-components";
import booking from "../../assets/booking.png";
import { useSearchParams, Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router';

import axios from "axios";

const LinkTag = styled(Link)`
    width: 10%;
    text-align: right;
`

const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    
    border-top: 1px solid #000000;
    // background-color: gray;
    height: 100px;
    padding: 20px 0px;

`

const MessageSubTitle = styled.div`
    display: flex;
    align-items: flex-end;
    
    width: 100%;
    color: #838383;
    font-size: 15px;
    // background-color: gray;
    height: 25%;
`

const MessageInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;

    font-weight: bold;
    font-size: 20px;
    text-align: center;
    // background-color: red;
`

const ImgIcon = styled.img`
    width: 35px;
    height: 35px;
`

export default function ReservationInfo({subTitle, info, recentData}) {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    const navigate = useNavigate();
    // 가장 최근 내역의 '요일'을 통해, 이번주 또는 다음주에 같은 날짜에 해당하는 날을 찾는 함수
    const findRecentDay = () => {
        const nowDay = new Date().getDay();
        const recentDay = dayList.indexOf(recentData.day);
        
        // 최근 예약 일 === 오늘 일 -> 오늘 날짜 그대로 반환
        if (recentDay === nowDay) {
            console.log('최근 예약 일 == 오늘 일');
            return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)
        }
        // 최근 예약 일 < 오늘 일 -> (7 - (오늘 일 - 최근 예약 일)) % 7
        if (recentDay < nowDay) {
            console.log('최근 예약 일 < 오늘 일');
            return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7 - (nowDay - recentDay));
        }
        // 최근 예약 일 > 오늘 일 -> (최근 예약 일 - 오늘 일)
        if (recentDay > nowDay) {
            console.log('최근 예약 일 > 오늘 일');
            return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (recentDay - nowDay));
        }
    }

    const quickReservationHandler = () => {
        const recentFullDay = findRecentDay();
        const yearString = recentFullDay.getFullYear().toString();
        const monthString = (recentFullDay.getMonth() + 1) < 10 ? "0" + (recentFullDay.getMonth() + 1).toString() : (recentFullDay.getMonth() + 1).toString();
        const dateString = (recentFullDay.getDate()) < 10 ? "0" + recentFullDay.getDate().toString() : recentFullDay.getDate().toString();
        const dayString = recentFullDay.getDay();

        const reservationFromInfo = `${yearString}-${monthString}-${dateString}T${recentData.startHour}:${recentData.startMinute}Z`;
        const reservationToInfo = `${yearString}-${monthString}-${dateString}T${recentData.endHour}:${recentData.endMinute}Z`;
        
        console.log(reservationFromInfo);
        console.log(reservationToInfo);
        // console.log(new Date(reservationFromInfo));
        // console.log(new Date(reservationToInfo));

        const reservationInfo = {
            start: new Date(reservationFromInfo),
            end: new Date(reservationToInfo),
            status: "RESERVED",
            regular: false,
        }   


        axios.post('/reserve/', {...reservationInfo}, {params: {room_id: recentData.room_id}})
            .then((res) => {
                console.log(res);
                const reservationId = res.data;
                // alert(`${year}년 ${month}월 ${date}일 ${startTime}시 부터 ${endTime}까지 예약을 완료했습니다`);
                navigate(`/sharereservationpage?year=${yearString}&month=${monthString}&date=${dateString}&day=${dayString}&startTime=${recentData.startHour}&startMinute=${recentData.startMinute}&endTime=${recentData.endHour}&endMinute=${recentData.endMinute}&room_id=${recentData.room_id}&reservationId=${reservationId}`)
            })
            .catch((err) => {
                console.log("ERRR");
                alert(`${err.response.data.message}`);
            })

    }

    return (
        <MessageBox>
            <MessageSubTitle>{subTitle}</MessageSubTitle>
            {
                // subTitle === "가장 최근 이용 내역" && recentData ? <MessageInfo>{info} <LinkTag to={`/reservation?room_id=${recentData.room_id}&startHour=${recentData.startHour}%startMinute=${recentData.startMinute}&endHour=${recentData.endHour}&endMinute=${recentData.endMinute}$day=${recentData.day}`}><ImgIcon src={booking} alt="" /></LinkTag></MessageInfo> : <MessageInfo>{info}</MessageInfo>
                subTitle === "가장 최근 이용 내역" && recentData ? <MessageInfo>{info} <ImgIcon src={booking} alt="" onClick={quickReservationHandler}/></MessageInfo> : <MessageInfo>{info}</MessageInfo>
                // subTitle === "가장 최근 이용 내역" ? RecentElement() : <MessageInfo>{info}</MessageInfo>
            }
        </MessageBox>

    );
}

