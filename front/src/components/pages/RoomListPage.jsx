import { Link } from 'react-router-dom';
import styled from 'styled-components';

function RoomListPage() {
    return (
        <ChooseReservationContainer>
            <div>
                <TitleH>회의실을 둘러보세요</TitleH>
            </div>
            <BtnBox>
                <LinkStyle to={`/RoomInfo?room_id=${835}`}><BtnStyle><h3>835</h3></BtnStyle></LinkStyle>
                <LinkStyle to={`/RoomInfo?room_id=${836}`}><BtnStyle><h3>836</h3></BtnStyle></LinkStyle>
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

const TitleH = styled.h3`
    font-size: 30px;
`

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px;
    // background-color: gray;
`

const BtnStyle = styled.button`
    background-color: #99d98c;
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

export default RoomListPage;

// import '../css/RoomListPageStyle.css';
// import { Link } from 'react-router-dom';

// function RoomListPage() {
//     return (
//         <div id="roomListPageContainer">
//             <section id="roomListSection">
//                 <div id="roomListTitle">
//                     <h1>회의실을 둘러보세요</h1>
//                 </div>
//                 <div id="roomListSpace">
//                     <ul id="roomList">
//                         <li>
//                             <Link to='/RoomInformationPage'>
//                                 <button className="roomObject" style={{ backgroundColor: '#FF8484' }}>
//                                     <h3>835</h3>
//                                 </button>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/RoomInformationPage'>
//                                 <button className="roomObject" style={{ backgroundColor: '#FFC793' }}>
//                                     <h3>836</h3>
//                                 </button>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="message">
//                     <h4>클릭하면 자세한 정보로 넘어가요</h4>
//                 </div>
//             </section >
//         </div>
//     );
// }

// export default RoomListPage;