import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function ShowReservation() {
    const [reserveList, setReserveList] = useState([]);
    const [loginId, setLoginId] = useState("");
    const navigate = useNavigate();
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                // console.log(res);
                setLoginId((id) => res.data);
                // console.log("로그인 되어있습니다")
            })
            .catch((err) => {
                navigate('/loginPage')
            })
    }, []);

    useEffect(() => {
        axios.get('/reserve/user-list')
            .then((res) => {
                // console.log(res.data);
                const info = makeReserveList(res.data);
                setReserveList((state) => [...info]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const makeReserveList = (data) => {
        const infoData = [];
        for (let el of data) {
            const startTmp = el.start.split('T'); // 2023-04-20     05:00:00
            const endTmp = el.end.split('T'); // 2023-04-20     05:00:00
            
            const startCal = startTmp[0].split('-');
            const startTime = startTmp[1].split(':');
            const endTime = endTmp[1].split(':');

            const info = {
                year: startCal[0],
                month: startCal[1],
                date: startCal[2],
                day: dayList[new Date(startCal[0], startCal[1]-1, startCal[2]).getDay()],
                sHour: startTime[0],
                sMinute: startTime[1],
                eHour: endTime[0],
                eMinute: endTime[1],
            }
            infoData.push(info);
            // console.log(info);
        }
        return infoData;
    }

    return (
        <ShowContainer>
            <ProfileDiv>
                <h1>{loginId}님의 <br/> 예약내역입니다.</h1>
            </ProfileDiv>
            {reserveList.map((it, idx) => (
                <ShowDiv key={idx}>
                    <h3>{it.year}년 {it.month}월 {it.date}일 {it.day}요일<br/> {it.sHour}:{it.sMinute}시 ~ {it.eHour}:{it.eMinute}시</h3>
                </ShowDiv>
            ))}
        </ShowContainer>
    )
}

const ShowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    // background-color: gray;
`

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    border-bottom: 1px solid black;

    width: 100%;
    max-width: 500px;
    height: 20vh;
`

const ShowDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 500px;
    border-bottom: 1px solid black;
    padding: 10px;

    text-align: center;
`