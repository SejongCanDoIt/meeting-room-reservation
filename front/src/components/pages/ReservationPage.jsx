import '../css/ReservationPageStyle.css';
import { Link } from 'react-router-dom';

function ReservationPage() {
    return (
        <div id="reservationPageContainer">
            <section id="roomListSection">
                <div id="roomListTitle">
                    <h1>어떤 회의실을 <br></br> 사용하실 건가요?</h1>
                </div>
                <div id="roomListSpace">
                    <ul id="roomList">
                        <li>
                            <Link to='/ChooseReservationPage'>
                                <button className="roomObject" style={{ backgroundColor: '#FF8484' }}>
                                    <h3>835</h3>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/ChooseReservationPage'>
                                <button className="roomObject" style={{ backgroundColor: '#FFC793' }}>
                                    <h3>836</h3>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="message">
                    <h4>회의실을 선택해주세요</h4>
                </div>
            </section >
        </div>
    );
}

export default ReservationPage;