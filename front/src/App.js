import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import RoomListPage from './components/pages/RoomListPage';
import RoomInformationPage from './components/pages/RoomInformationPage';
import ChangePasswordPage from './components/pages/ChangePasswordPage';
import ChangeCompletePage from './components/pages/ChangeCompletePage';
import ReservationPage from './components/pages/ReservationPage';
import ChooseReservationPage from './components/pages/ChooseReservationPage';
import ReservationCompletePage from './components/pages/ReservationCompletePage';
import ShareReservationPage from './components/pages/ShareReservationPage';
import SelectMeetingRoom from './components/pages/SelectMeetingRoom';
import StartPage from "./components/pages/StartPage";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import MyPage from "./components/pages/MyPage";
import RoomInfo from "./components/pages/RoomInfo";
import PrivateRoute from "./components/pages/PrivateRoute";
import Reservation from "./components/pages/Reservation";
import Regularreservations from "./components/pages/RegularReservation";
import ShowReservation from "./components/pages/ShowReservation";
import Logout from './components/pages/Logout';
import styled from 'styled-components';
import AdminMemberManagePage from './components/pages/AdminMemberManagePage';
import AdminRoomManagePage from './components/pages/AdminRoomManagePage';
import AdminSettingPage from './components/pages/AdminSettingPage';
import AdminReservManagePage from './components/pages/AdminReservManagePage';
import AdminRoomInfoPage from './components/pages/AdminRoomInfoPage';
import AdminRoomModifyPage from './components/pages/AdminRoomModifyPage';

function App() {
  return (
    <BrowserRouter>
      <RootContainer>
        <NavBar>
          <LinkStyle to="/">예약 시스템</LinkStyle>
        </NavBar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/RoomListPage" element={<RoomListPage />}></Route>
          <Route path="/RoomInformationPage" element={<RoomInformationPage />}></Route>
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />}></Route>
          <Route path="/ChangeCompletePage" element={<ChangeCompletePage />}></Route>
          <Route path="/ReservationPage" element={<ReservationPage />}></Route>
          <Route path="/ChooseReservationPage" element={<ChooseReservationPage />}></Route>
          <Route path="/selectmeetingroom" element={<SelectMeetingRoom />}></Route>
          <Route path="/ReservationCompletePage" element={<ReservationCompletePage />}></Route>
          <Route path="/ShareReservationPage" element={<ShareReservationPage />}></Route>
          <Route path="/startPage" element={<StartPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/mainPage" element={<MainPage />}></Route>
          <Route path="/myPage" element={<MyPage />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          {/* <Route path="/show" element={<PrivateRoute component={<ShowReservation />} authenticated={token}/>} /> */}
          <Route path="/show" element={<ShowReservation />}/>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/regularReservation" element={<Regularreservations />}></Route>
          <Route path="/AdminMemberManagePage" element={<AdminMemberManagePage />}></Route>
          <Route path="/AdminRoomManagePage" element={<AdminRoomManagePage />}></Route>
          <Route path="/AdminSettingPage" element={<AdminSettingPage />}></Route>
          <Route path="/AdminReservManagePage" element={<AdminReservManagePage />}></Route>
          <Route path="/AdminRoomInfoPage/:id" element={<AdminRoomInfoPage />} />
          <Route path="/AdminRoomModifyPage" element={<AdminRoomModifyPage />}></Route>
          <Route path="/RoomInfo" element={<RoomInfo />}></Route>
        </Routes>
      </RootContainer>
    </BrowserRouter>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkStyle = styled(Link)`
  color: white;
  text-decoration: none;
`

const NavBar = styled.div`

  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 25px;

  // padding: 15px;
  z-index: 1;

  // @media screen and (max-width: 600px) {
  //   padding: 10px;
  // }

  background-color: #A1203C;
  color: white;

`

export default App;
