import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router";
import styled from "styled-components";
import booking from "../../assets/booking.png";
import deleteIcon from "../../assets/deleteIcon.png";

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

                // 같은 날일때는 시간이 앞선 것부터.
                info.sort((a, b) => b.startHour - a.startHour);
                // 그 다음에 날짜를 기준으로 정렬
                info.sort((a, b) => b.date - a.date);
                // 월별 기준으로 정렬
                info.sort((a, b) => b.month - a.month);

                // 상태 반영
                setReserveList((state) => [...info]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const makeReserveList = (data) => {
        const infoData = [];
        for (let el of data) {
            // console.log(el);
            const startTmp = el.start.split('T'); // 2023-04-20     05:00:00
            const endTmp = el.end.split('T'); // 2023-04-20     05:00:00
            
            const startCal = startTmp[0].split('-');
            const startTime = startTmp[1].split(':');
            const endTime = endTmp[1].split(':');
            const isExpire = new Date(el.start) < new Date(); // 만료된 예약인지 확인.
            // console.log(isExpire);

            const info = {
                reservationId: el.reservation_id,
                year: startCal[0],
                month: startCal[1],
                date: startCal[2],
                day: dayList[new Date(startCal[0], startCal[1]-1, startCal[2]).getDay()],
                startHour: startTime[0],
                startMinute: startTime[1],
                endHour: endTime[0],
                endMinute: endTime[1],
                isExpire: isExpire,
            }
            infoData.push(info);
            // console.log(info);
        }
        return infoData;
    }

    const onReservationDeleteHandler = (reservationId) => {
        // console.log(`${reservationId} 삭제를 진행합니다`);
        axios.delete('/reserve/delete-one', {params: {reservation_id: reservationId}})
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <ShowContainer>
            <ProfileDiv>
                <h1>{loginId}님의 <br/> 예약내역입니다.</h1>
            </ProfileDiv>
            {reserveList.map((it, idx) => (
                <ShowDiv key={idx} isExpire={it.isExpire}>
                    {it.isExpire ? <Ptag isExpire={it.isExpire}>만료된 예약</Ptag> : <Ptag isExpire={it.isExpire}>예정된 예약</Ptag>}
                    <ContentDiv>
                        <ContentInfo>{it.year}년 {it.month}월 {it.date}일 {it.day}요일<br/> {it.startHour}:{it.startMinute}시 ~ {it.endHour}:{it.endMinute}시</ContentInfo>
                        {it.isExpire ? <></> : <ImgBox><ImgTag src={deleteIcon} alt="" onClick={() => onReservationDeleteHandler(it.reservationId)}/></ImgBox>}
                        
                    </ContentDiv>
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

const ContentDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContentInfo = styled.h3`
    width: 100%;
`

const ImgBox = styled.div`
    width: 10%;
    // text-align: right;
    // background-color: gray;
`

const ImgTag = styled.img`
    width: 40px;
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
    // justify-content: flex-start;

    width: 100%;
    max-width: 500px;
    border-bottom: 1px solid black;
    padding: 3px;
    
    background-color: ${(props) => (props.isExpire ? "#FAFAFA" : "#FFFFFF")};
    color: ${(props) => (props.isExpire ? "#dee2e6" : "black")};

    text-align: center;
`

const Ptag = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 10px;
    color: ${(props) => (props.isExpire ? "#dee2e6" : "#838383")};
`