import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import '../css/ShareReservationPageStyle.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useEffect, useState } from "react";
import styled from "styled-components";

function ShareReservationPage() {
    const [serchParams, setSearchParams] = useSearchParams();
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    const location = useLocation();
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const copyedUrl = "http://localhost:3000/" + location.pathname + location.search;
        setUrl((url) => copyedUrl);
    }, [])

    const makeFullLink = () => {
        return "http://localhost:3000/" + location.pathname + location.search;
    }

    const onLinkCopyHandler = () => {
        console.log(url);
        alert("링크 복사 완료!")
        navigate('/show', {replace: true});
    }
    
    return (
        <div id="shareReservationPageContainer">
            <section id="shareReservationSection">
                <div id="contentListSpace">
                    <ReserveContent>
                        <ConfirmDiv>예약을 확인해드릴게요</ConfirmDiv>
                        <ul id="contentList">
                            <li className="contents"><span>날짜</span> {serchParams.get('year')}년 {serchParams.get('month')}월 {serchParams.get('date')}일</li>
                            <li className="contents"><span>요일</span> {dayList[serchParams.get('day')]}요일</li>
                            <li className="contents"><span>시간</span> {serchParams.get('startTime')}시부터 {serchParams.get('endTime')}시</li>
                            <li className="contents"><span>장소</span> AI센터 {serchParams.get('room_id')}호</li>
                        </ul>
                        <CopyToClipboard text={url}>
                                <ReserveBtn onClick={onLinkCopyHandler}>링크 복사하기</ReserveBtn>
                        </CopyToClipboard>
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

export default ShareReservationPage;