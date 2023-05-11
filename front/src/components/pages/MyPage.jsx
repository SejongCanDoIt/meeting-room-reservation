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
import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";

export default function MyPage() {
    const [serchParams, setSearchParams] = useSearchParams();
    const [loginId, setLoginId] = useState("");
    const [reserveList, setReserveList] = useState([]);
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
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
                <IntroBox>
                    <Intro>{loginId}님</Intro>
                    <div>
                        {/* <LinkTag to="/ChangePasswordPage"><EditIcon src={edit} alt="" /></LinkTag> */}
                        <LinkTag to="/ChangePasswordPage"><ChangePasswordBtn>비밀번호 수정하기</ChangePasswordBtn></LinkTag>
                    </div>
                </IntroBox>
            </ProfileDiv>
            <MenuContainer>
                <ReservationInfo subTitle={"오늘의 예약"} info={"835호 13:30 ~ 16:30분에 오늘 예약이 있어요"}/>
                <ReservationInfo subTitle={"가장 최근 이용 내역"} info={"2023년 1월 12일 월요일 15:00 ~ 16:00"}/>
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
const LinkTag = styled(Link)`
    width: 10%;
    text-align: right;
`

const IntroBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

`

const ChangePasswordBtn = styled.button`
    background-color: transparent;
    padding: 3px;
    
    font-size: 10px;
    font-weight: bold;
    color: black;

    border: 1px solid black;
    border-radius: 3px;

`

const ProfileDiv = styled.div`
    display: flex;
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

const Intro = styled.h2`
    // font-weight: bold;
    // font-size: 1.5em;
    display: flex;
    justify-content: center;
    // background-color: gray;
`


const UserIcon = styled.img`
    width: 100px;
    max-width: 200px;
    margin-right: 10px;
`

const EditIcon = styled.img`
    width: 100%;
    max-width: 30px;
`

