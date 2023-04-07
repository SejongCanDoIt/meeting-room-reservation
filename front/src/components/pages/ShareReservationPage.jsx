import '../css/ShareReservationPageStyle.css';

function ShareReservationPage() {
    return (
        <div id="shareReservationPageContainer">
            <section id="shareReservationSection">
                <div id="shareReservationTitle">
                    <h1>예약 확인</h1>
                </div>
                <div id="contentListSpace">
                    <img id="shareRoomImage" alt="roomImage" src="https://www.ibusiness.co.kr/wp-content/themes/twentytwenty-child/page/images/common_preview_conference07.jpg"></img>
                    <ul id="contentList">
                        <li className="contents">날짜 <p>2023년 3월 30일</p></li>
                        <li className="contents">요일 <p>월요일</p></li>
                        <li className="contents">시간 <p>3시부터 5시</p></li>
                        <li className="contents">장소 <p>AI센터 835호</p></li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default ShareReservationPage;