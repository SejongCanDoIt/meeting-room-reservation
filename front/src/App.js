import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import RoomListPage from './Pages/RoomListPage';
import RoomInformationPage from './Pages/RoomInformationPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import ChangeCompletePage from './Pages/ChangeCompletePage';
import ReservationPage from './Pages/ReservationPage';
import ChooseReservationPage from './Pages/ChooseReservationPage';
import ReservationCompletePage from './Pages/ReservationCompletePage';
import ShareReservationPage from './Pages/ShareReservationPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<MainPage />}>
          </Route>
          <Route path="/RoomListPage" element={<RoomListPage />}>
          </Route>
          <Route path="/RoomInformationPage" element={<RoomInformationPage />}>
          </Route>
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />}>
          </Route>
          <Route path="/ChangeCompletePage" element={<ChangeCompletePage />}>
          </Route>
          <Route path="/ReservationPage" element={<ReservationPage />}>
          </Route>
          <Route path="/ChooseReservationPage" element={<ChooseReservationPage />}>
          </Route>
          <Route path="/ReservationCompletePage" element={<ReservationCompletePage />}>
          </Route>
          <Route path="/ShareReservationPage" element={<ShareReservationPage />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
