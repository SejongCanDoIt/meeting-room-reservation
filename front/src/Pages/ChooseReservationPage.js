import './ChooseReservationPageStyle.css';

function ChooseReservationPage() {
    return (
        <div id="ChooseReservationPageContainer">
            <section id="reservationListSection">
                <div id="reservationListTitle">
                    <h1>예약하실 방법을 <br></br> 선택해주세요</h1>
                </div>
                <div id="reservationListSpace">
                    <ul id="reservationList">
                        <li>
                            <button className="reservationObject" style={{ backgroundColor: '#FF8484' }}>
                                <h3>정기 예약</h3>
                            </button>
                        </li>
                        <li>
                            <button className="reservationObject" style={{ backgroundColor: '#85D3FF' }}>
                                <h3>일반 예약</h3>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="message">
                    <h4>예약 종류를 선택해주세요</h4>
                </div>
            </section >
        </div>
    );
}

export default ChooseReservationPage;