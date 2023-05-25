import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import houseIcon from "./assets/houseIcon.png";
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
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
import Announcement from "./components/pages/Announcement";
import NoShowTest from "./components/pages/NoShowTest";
import TestReservation from "./components/pages/TestReservation";
import PrivateRoute from "./components/pages/PrivateRoute";
import ShowRegularReservation from "./components/pages/ShowRegularReservation";
import Reservation from "./components/pages/Reservation";
import Regularreservations from "./components/pages/RegularReservation";
import ShowReservation from "./components/pages/ShowReservation";
import Logout from './components/pages/Logout';
import AuthenticatingPage from './components/pages/AuthenticatingPage';
import styled from 'styled-components';
import AdminMemberManagePage from './components/pages/AdminMemberManagePage';
import AdminRoomManagePage from './components/pages/AdminRoomManagePage';
import AdminSettingPage from './components/pages/AdminSettingPage';
import AdminSettingModifyPage from './components/pages/AdminSettingModifyPage';
import AdminReservHistoryPage from './components/pages/AdminReservHistoryPage';
import AdminReservManagePage from './components/pages/AdminReservManagePage';
import AdminRoomInfoPage from './components/pages/AdminRoomInfoPage';
import AdminRoomAddPage from './components/pages/AdminRoomAddPage';
import AdminRoomModifyPage from './components/pages/AdminRoomModifyPage';

function App() {
  return (
    <BrowserRouter>
      <RootContainer>
        <NavBar>
          <LinkStyle to="/">예약 시스템 <HouseIcon src={houseIcon} alt=""/></LinkStyle>
        </NavBar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/roomlistPage" element={<RoomListPage />}></Route>
          <Route path="/roominformationpage" element={<RoomInformationPage />}></Route>
          <Route path="/changepasswordpage" element={<ChangePasswordPage />}></Route>
          <Route path="/changecompletepage" element={<ChangeCompletePage />}></Route>
          <Route path="/reservationpage" element={<ReservationPage />}></Route>
          <Route path="/choosereservationpage" element={<ChooseReservationPage />}></Route>
          <Route path="/selectmeetingroom" element={<SelectMeetingRoom />}></Route>
          <Route path="/reservationcompletepage" element={<ReservationCompletePage />}></Route>
          <Route path="/sharereservationpage" element={<ShareReservationPage />}></Route>
          <Route path="/showregularreservation" element={<ShowRegularReservation />}></Route>
          <Route path="/startpage" element={<StartPage />}></Route>
          <Route path="/loginpage" element={<LoginPage />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/announcement" element={<Announcement />}></Route>
          <Route path="/authenticating" element={<AuthenticatingPage />}></Route>
          <Route path="/noshow" element={<NoShowTest />}></Route>
          {/* <Route path="/show" element={<PrivateRoute component={<ShowReservation />} authenticated={token}/>} /> */}
          <Route path="/show" element={<ShowReservation />}/>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/test-reservation" element={<TestReservation />}></Route>
          <Route path="/regularReservation" element={<Regularreservations />}></Route>
          <Route path="/AdminMemberManagePage" element={<AdminMemberManagePage />}></Route>
          <Route path="/AdminRoomManagePage" element={<AdminRoomManagePage />}></Route>
          <Route path="/AdminSettingPage" element={<AdminSettingPage />}></Route>
          <Route path="/AdminSettingModifyPage" element={<AdminSettingModifyPage />}></Route>
          <Route path="/AdminReservHistoryPage" element={<AdminReservHistoryPage />}></Route>
          <Route path="/AdminReservManagePage" element={<AdminReservManagePage />}></Route>
          <Route path="/AdminRoomInfoPage/:id" element={<AdminRoomInfoPage />} />
          <Route path="/AdminRoomAddPage" element={<AdminRoomAddPage />}></Route>
          <Route path="/AdminRoomModifyPage/:id" element={<AdminRoomModifyPage />}></Route>
          <Route path="/RoomInfo" element={<RoomInfo />}></Route>
          <Route path="/*" element={<NotFound />}></Route>

        </Routes>
      </RootContainer>
    </BrowserRouter>
  );
}

const HouseIcon = styled.img`
  width: 20px;
  height: 20px;
`

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
