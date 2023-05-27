import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function ShowRegularReservation() {
    const location = useLocation();
    const [serchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const onLinkCopyHandler = () => {
        navigate('/show', {replace: true});
    }
    
    useEffect(() => {
        axios.post('/reserve/email', null, {params: {reservation_id: serchParams.get('reservationId')}})
            .then((res) => {
                console.log('이메일 전송 요청');
            })
            .catch((err) => {
                console.log("이메일 전송 요청 실패");
            })
    }, []);
    
    return (
        <div id="shareReservationPageContainer">
            <section id="shareReservationSection">
                <div id="contentListSpace">
                    <ReserveContent>
                        <ConfirmDiv>예약을 확인해드릴게요</ConfirmDiv>
                            <h1>정기 예약이 완료되었어요.</h1>
                            <Ptag>일정이 있는 경우 예약이 완료되지 않을수도 있습니다</Ptag>
                            <ReserveBtn onClick={onLinkCopyHandler}>예약 확인하기</ReserveBtn>
                    </ReserveContent>
                </div>
            </section>
        </div>
    );
}

const ConfirmDiv = styled.div`
    text-align: center;
    
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
    
    width: 100%;
    color: #A1203C;
    // background-color: #b5e48c;
`

const Ptag = styled.p`
    color: gray;
    font-size: 12px;
`

const ReserveContent = styled.div`
    width: 90%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;

    border-radius: 10px;
    // background-color: gray;
    box-shadow: 5px 10px 20px gray;
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
