import MainPageMenu from "./MainPageMenu";
import user from "../assets/user.png";
import whiteuser from "../assets/whiteuser.png";
import search from "../assets/search-interface-symbol.png";
import calendar from "../assets/calendar.png";
import styled from "styled-components";
import visibility from "../assets/visibility.png";

export default function MainPage() {
    return (
        <MainPageContainer>
            <ProfileDiv>
                <UserIcon src={user} alt="" />
                <h1>김민구</h1>
            </ProfileDiv>
            <MenuContainer>
                <MainPageMenu icon={whiteuser} title={"내 정보"}/>
                <MainPageMenu icon={calendar} title={"예약하기"}/>
                <MainPageMenu icon={search} title={"예약 조회하기"}/>
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


const UserIcon = styled.img`
    width: 100px;
    max-width: 200px;
`