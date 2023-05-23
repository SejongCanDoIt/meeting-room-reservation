import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';

function ChooseReservationPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                isRoomIdSelected();
            })
            .catch((err) => {
                navigate('/loginPage')
            })
    }, [])

    // 회의실이 선택되지 않았을때 실행되는 함수
    const isRoomIdSelected = () => {
        const selectedRoomId = searchParams.get('room_id');
        if (selectedRoomId === null || selectedRoomId === "null") {
            alert('회의실을 선택해주세요');
            navigate('/selectmeetingroom');
        }
    }

    return (
        <ChooseReservationContainer>
            <div>
                <TitleH>예약방법을 선택해주세요</TitleH>
            </div>
            <BtnBox>
                <LinkStyle to={`/regularreservation?room_id=${searchParams.get('room_id')}`}><BtnStyle><h3>정기 예약</h3></BtnStyle></LinkStyle>
                <LinkStyle to={`/reservation?room_id=${searchParams.get('room_id')}`}><BtnStyle><h3>일반 예약</h3></BtnStyle></LinkStyle>
            </BtnBox>
            <div>
                <Ptag>선택시 다음 화면으로 넘어가요</Ptag>
            </div>
        </ChooseReservationContainer>
    );
}

const ChooseReservationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
    // background-color: gray;
`

const TitleH = styled.div`
    font-size: 25px;
    font-weight: bold;
`

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px;
    // background-color: gray;
`

const BtnStyle = styled.button`
    background-color: #FF8484;
    border: none;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;

    color: white;
    font-size: 13px;

    width: 100px;
    height: 100px;
`
const Ptag = styled.p`
    color: gray;
    font-size: 13px;
`

const LinkStyle = styled(Link)`
  color: white;
  text-decoration: none;
`

export default ChooseReservationPage;

// import '../css/ChooseReservationPageStyle.css';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// function ChooseReservationPage() {
//     return (
//         <div id="ChooseReservationPageContainer">
//             <section id="reservationListSection">
//                 <div id="reservationListTitle">
//                     <h1>예약하실 방법을 <br></br> 선택해주세요</h1>
//                 </div>
//                 <div id="reservationListSpace">
//                     <ul id="reservationList">
//                         <li>
//                             <button className="reservationObject" style={{ backgroundColor: '#FF8484' }}>
//                                 <LinkStyle to="/regularreservation"><h3>정기 예약</h3></LinkStyle>
//                             </button>
//                         </li>
//                         <li>
//                             <button className="reservationObject" style={{ backgroundColor: '#85D3FF' }}>
//                                 <LinkStyle to="/reservation"><h3>일반 예약</h3></LinkStyle>
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
                
//                 <div className="message">
//                     <h4>예약 종류를 선택해주세요</h4>
//                 </div>
//             </section >
//         </div>
//     );
// }

// const LinkStyle = styled(Link)`
//   color: white;
//   text-decoration: none;
// `

// export default ChooseReservationPage;