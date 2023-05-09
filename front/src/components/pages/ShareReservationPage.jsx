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
                    <h1>예약을 확인해드릴게요</h1>
                    <ReserveContent>
                        <ul id="contentList">
                            <li className="contents">날짜 <p>{serchParams.get('year')}년 {serchParams.get('month')}월 {serchParams.get('date')}일</p></li>
                            <li className="contents">요일 <p>{dayList[serchParams.get('day')]}요일</p></li>
                            <li className="contents">시간 <p>{serchParams.get('startTime')}시부터 {serchParams.get('endTime')}시</p></li>
                            <li className="contents">장소 <p>AI센터 835호</p></li>
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

const ReserveContent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

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