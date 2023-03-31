import '../css/RoomListPageStyle.css';

function RoomListPage() {
    return (
        <div id="roomListPageContainer">
            <section id="roomListSection">
                <div id="roomListTitle">
                    <h1>회의실을 둘러보세요</h1>
                </div>
                <div id="roomListSpace">
                    <ul id="roomList">
                        <li>
                            <button className="roomObject" style={{ backgroundColor: '#FF8484' }}>
                                <h3>835</h3>
                            </button>
                        </li>
                        <li>
                            <button className="roomObject" style={{ backgroundColor: '#FFC793' }}>
                                <h3>836</h3>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="message">
                    <h4>클릭하면 자세한 정보로 넘어가요</h4>
                </div>
            </section >
        </div>
    );
}

export default RoomListPage;