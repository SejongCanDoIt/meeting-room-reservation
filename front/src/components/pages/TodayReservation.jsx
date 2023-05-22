import styled from "styled-components";
import { useState, useEffect, useReducer } from "react";
import axios from 'axios';

const TodayContainer = styled.div`
    width: 100%;
    display: flex;;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 0.9;


`

const TodayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    font-weight: bold;
    font-size: 20px;
    border-radius: 20px;

    background-color: #52b788;

    width: 95%;
    height: 100px;
    border-radius: 10px;

`

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function TodayReservationList() {
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        createMonthReservedCount();
    }, [])
    // 월별 예약건수를 서버에 요청해 만드는 함수.
    const createMonthReservedCount = async () => {
        const year = new Date().getFullYear().toString();
        const month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth()+1).toString() : (new Date().getMonth()+1).toString();
        const day = new Date().getDate() < 10 ? "0" + new Date().getDate().toString() : new Date().getDate().toString();

        const requestDayInfo = {
            year: year,
            month: month,
            day: day,
            roomId: '835',
        }
        const requestDayInfo2 = {
            year: year,
            month: month,
            day: day,
            roomId: '836',
        }

        console.log(requestDayInfo);

        axios.post('/reserve/today-reserve-cnt-all', {...requestDayInfo})
            .then((res) => {
                console.log(res, '835')
                setCnt(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <TodayContainer>
            <ContentBox>
                <h2>오늘의 예약</h2>
                <TodayBox>{cnt}건이 있어요</TodayBox>
            </ContentBox>
            <ContentBox>
                <h2>현재 운영중인 회의실</h2>
                <TodayBox>AI센터에 2곳이 운영중에요.</TodayBox>
            </ContentBox>
        </TodayContainer>
    );
}