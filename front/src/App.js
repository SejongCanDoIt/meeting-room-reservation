import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import StartPage from "./components/StartPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/startPage" element={<StartPage/>}></Route>
        <Route path="/loginPage" element={<LoginPage/>}></Route>
        <Route path="/mainPage" element={<MainPage/>}></Route>
        <Route path="/myPage" element={<MyPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
