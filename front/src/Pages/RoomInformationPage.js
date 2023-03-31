import './RoomInformationPageStyle.css';

function RoomInformationPage() {
    return (
        <div id="roomInformationPageContainer">
            <section id="imageSection">
                <img id="roomImage" alt="roomImage" src="https://www.ibusiness.co.kr/wp-content/themes/twentytwenty-child/page/images/common_preview_conference07.jpg"></img>
            </section>
            <section id="nameSection">
                <h1 style={{ fontWeight: 'bolder' }}>AI센터 835호 회의실</h1>
                <button id="reservationButton">예약</button>
            </section>
            <hr></hr>
            <section id="facilitySection">
                <h3 className='roomInformationPageText'>보유 편의 시설</h3>
                <ul id="facilityList">
                    <li className="facility">
                        <img className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/664/664374.png"></img>
                        <p>8개</p>
                    </li>
                    <li className="facility">
                        <img className="facilityIcon" alt="wifi" src="https://cdn-icons-png.flaticon.com/512/566/566280.png"></img>
                        <p>없음</p>
                    </li>
                    <li className="facility">
                        <img className="facilityIcon" alt="beamProjector" src="https://cdn-icons-png.flaticon.com/512/4021/4021963.png"></img>
                        <p>1개</p>
                    </li>
                    <li className="facility">
                        <img className="facilityIcon" alt="whiteBoard" src="https://cdn-icons-png.flaticon.com/512/8148/8148583.png"></img>
                        <p>1개</p>
                    </li>
                    <li className="facility">
                        <img className="facilityIcon" alt="monitor" src="https://cdn-icons-png.flaticon.com/512/81/81793.png"></img>
                        <p>1개</p>
                    </li>
                    <li className="facility">
                        <img className="facilityIcon" alt="computer" src="https://cdn-icons-png.flaticon.com/512/2004/2004580.png"></img>
                        <p>1개</p>
                    </li>
                </ul>
            </section>
            <hr></hr>
            <section id="descriptionSection">
                <h3 className='roomInformationPageText'>설명</h3>
                <p>회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.</p>
            </section>
            <hr></hr>
            <section id="locationSection">
                <h3 className='roomInformationPageText'>위치</h3>
                <p>대양 AI센터 835호 회의실은 세종대학교 대양AI센터 8층에 위치해 있습니다.</p>
            </section>
        </div>
    );
}

export default RoomInformationPage;