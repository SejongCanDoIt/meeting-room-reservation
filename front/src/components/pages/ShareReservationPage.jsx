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
                    <h1>예약 확인</h1>
                    <ShareReservedImg id="shareRoomImage" alt="roomImage" src="https://www.ibusiness.co.kr/wp-content/themes/twentytwenty-child/page/images/common_preview_conference07.jpg"></ShareReservedImg>
                    <ul id="contentList">
                        <li className="contents">날짜 <p>{serchParams.get('year')}년 {serchParams.get('month')}월 {serchParams.get('date')}일</p></li>
                        <li className="contents">요일 <p>{dayList[serchParams.get('day')]}요일</p></li>
                        <li className="contents">시간 <p>{serchParams.get('startTime')}시부터 {serchParams.get('endTime')}시</p></li>
                        <li className="contents">장소 <p>AI센터 835호</p></li>
                        <CopyToClipboard text={url}>
                            <button onClick={onLinkCopyHandler}>링크 복사하기</button>
                        </CopyToClipboard>
                    </ul>
                </div>
            </section>
        </div>
    );
}

const ShareReservedImg = styled.img`
    width: 100%;
    max-width: 320px;
    border-radius: 30px;

`

export default ShareReservationPage;