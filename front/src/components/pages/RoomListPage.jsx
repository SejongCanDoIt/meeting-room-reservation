import '../css/RoomListPageStyle.css';
import { Link } from 'react-router-dom';

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
                            <Link to='/RoomInformationPage'>
                                <button className="roomObject" style={{ backgroundColor: '#FF8484' }}>
                                    <h3>835</h3>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/RoomInformationPage'>
                                <button className="roomObject" style={{ backgroundColor: '#FFC793' }}>
                                    <h3>836</h3>
                                </button>
                            </Link>
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