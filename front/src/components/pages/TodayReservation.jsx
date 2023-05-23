import styled from "styled-components";
import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import univ from "../../assets/univ.jpg";
import univ_library from "../../assets/univ_library.jpg";

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
    font-size: 25px;
    border-radius: 20px;

    // background-color: #52b788;
    background-image: url(${univ_library});
    background-size : cover;
    
    width: 95%;
    height: 100px;
    border-radius: 10px;

`

const ImgBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: white;

    width: 95%;
    height: 95%;

    border-radius: 10px;
    background-size : cover;
    font-weight: bold;

    background-repeat: no-repeat;
    // background-image: url(${univ});
    // background-image: url(${univ_library});
    background-image: url('https://images.unsplash.com/photo-1558636815-1978d0419bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    // background-image: url('https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80');

    @media screen and (max-width: 900px) {
        font-size: 30px;
        // font-weight: bold;
        text-align: center;
        // color: white;
        height: 300px;

        margin-top: 30px;
    }

`

const ContentContainer = styled.div`
    display: flex;
    width: 95%;
    margin-bottom: 15px;

    @media screen and (max-width: 500px) {
        flex-direction: column;
        // margin-bottom: 0px;
    }
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
            <ImgBox>예약 시스템을 이용해 <br/> 회의실을 예약해보세요</ImgBox>
            <ContentContainer>
                <ContentBox>
                    <h2>오늘의 예약</h2>
                    <TodayBox>{cnt}건이 있어요</TodayBox>
                </ContentBox>
                <ContentBox>
                    <h2>현재 운영중인 회의실</h2>
                    <TodayBox>AI센터에 2곳이 운영중에요.</TodayBox>
                </ContentBox>
            </ContentContainer>
        </TodayContainer>
    );
}