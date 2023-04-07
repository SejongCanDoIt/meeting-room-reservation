import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import StartPage from "./components/pages/StartPage";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import MyPage from "./components/pages/MyPage";
import GoogleCalendar from './components/pages/GoogleCalendar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/RoomListPage" element={<RoomListPage />}></Route>
          <Route path="/RoomInformationPage" element={<RoomInformationPage />}></Route>
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />}></Route>
          <Route path="/ChangeCompletePage" element={<ChangeCompletePage />}></Route>
          <Route path="/ReservationPage" element={<ReservationPage />}></Route>
          <Route path="/ChooseReservationPage" element={<ChooseReservationPage />}></Route>
          <Route path="/ReservationCompletePage" element={<ReservationCompletePage />}></Route>
          <Route path="/ShareReservationPage" element={<ShareReservationPage />}></Route>
          <Route path="/startPage" element={<StartPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/mainPage" element={<MainPage />}></Route>
          <Route path="/myPage" element={<MyPage />}></Route>
          <Route path="/GoogleCalendar" element={<GoogleCalendar />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
