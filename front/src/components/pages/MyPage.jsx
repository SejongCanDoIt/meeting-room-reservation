import MainPageMenu from "./MainPageMenu";
import ReservationInfo from "./ReservationInfo";
import user from "../../assets/user.png";
import search from "../../assets/search-interface-symbol.png";
import edit from "../../assets/edit.png";
import calendar from "../../assets/calendar.png";
import visibility from "../../assets/visibility.png";
import logout from "../../assets/logout.png";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function MyPage() {
    const [serchParams, setSearchParams] = useSearchParams();
    const [loginId, setLoginId] = useState("");
    const navigate = useNavigate();

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                console.log(res);
                setLoginId((id) => res.data);
                // console.log("로그인 되어있습니다")
            })
            .catch((err) => {
                navigate('/loginPage')
            })
    }, []);
    return (
        <MainPageContainer>
            <ProfileDiv>
                <UserIcon src={user} alt="" />
                <Dhdsh>안녕하세요 {loginId}님 <EditIcon src={edit} alt="" /></Dhdsh>
            </ProfileDiv>
            <MenuContainer>
                <ReservationInfo subTitle={"오늘의 예약"} info={"835호 13:30 ~ 16:30분에 오늘 예약이 있어요"}/>
                <ReservationInfo subTitle={"가장 최근 이용 내역"} info={"2023년 1월 12일 월요일 15:00 ~ 16:00 836호 "}/>
                <MainPageMenu icon={calendar} title={"예약하기"} where={"/ChooseReservationPage"}/>
                <MainPageMenu icon={search} title={"예약내역 확인하기"} where={"/show"}/>
                <MainPageMenu icon={visibility} title={"회의실 둘러보기"} where={"/RoomListPage"}/>
                <MainPageMenu icon={logout} title={"로그아웃"} where={"/logout"}/>
            </MenuContainer>
        </MainPageContainer>
    );
}

const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    height: 40%;
    // background-color: gray;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    // background-color: gray;
    flex: 1;
`

const Dhdsh = styled.h1`
    display: flex;
    justify-content: center;
    // background-color: gray;
`


const UserIcon = styled.img`
    width: 100px;
    max-width: 200px;
`

const EditIcon = styled.img`
    width: 10%;
    max-width: 150px;
`

