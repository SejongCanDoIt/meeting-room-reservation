import MainPageMenu from "./MainPageMenu";
import ReservationInfo from "./ReservationInfo";
import user from "../assets/user.png";
import search from "../assets/search-interface-symbol.png";
import edit from "../assets/edit.png";
import calendar from "../assets/calendar.png";
import visibility from "../assets/visibility.png";

import styled from "styled-components";

export default function MyPage() {
    return (
        <MainPageContainer>
            <ProfileDiv>
                <UserIcon src={user} alt="" />
                <Dhdsh>안녕하세요 민구님 <EditIcon src={edit} alt="" /></Dhdsh>
            </ProfileDiv>
            <MenuContainer>
                <ReservationInfo subTitle={"오늘의 예약"} info={"835호 13:30 ~ 16:30분에 오늘 예약이 있어요"}/>
                <ReservationInfo subTitle={"가장 최근 이용 내역"} info={"2023년 1월 12일 월요일 15:00 ~ 16:00 836호 "}/>
                <MainPageMenu icon={calendar} title={"예약하기"}/>
                <MainPageMenu icon={search} title={"예약내역 확인하기"}/>
                <MainPageMenu icon={visibility} title={"회의실 둘러보기"}/>
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
    width: 30%;
    max-width: 200px;
`

const EditIcon = styled.img`
    width: 10%;
    max-width: 150px;
`

