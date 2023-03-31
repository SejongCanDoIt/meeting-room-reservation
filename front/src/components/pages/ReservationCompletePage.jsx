import '../css/ReservationCompletePageStyle.css';

function ReservationCompletePage() {
    return (
        <div id="reservationCompletePageContainer">
            <section id="reservationCompleteSection">
                <div id="reservationCompleteTitle">
                    <h1>예약 완료! <br></br> 예약을 확인해드릴게요</h1>
                </div>
                <div id="contentListSpace">
                    <ul id="contentList">
                        <li className="contents">날짜 <p>2023년 3월 30일</p></li>
                        <li className="contents">요일 <p>월요일</p></li>
                        <li className="contents">시간 <p>3시부터 5시</p></li>
                        <li className="contents">장소 <p>AI센터 835호</p></li>
                    </ul>
                </div>
                <div id="shareMessage">
                    <h4>예약 정보 공유하기</h4>
                    <img id="shareIcon" alt="share" src="https://cdn-icons-png.flaticon.com/128/2990/2990295.png"></img>
                </div>
                <div className="message">
                    <h4>예약이 완료되면 마이페이지로 이동합니다</h4>
                </div>
            </section>
        </div>
    );
}

export default ReservationCompletePage;