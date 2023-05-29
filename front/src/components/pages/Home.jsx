import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import userwhite from "../../assets/userwhite.png";
import TodayReservationList from "./TodayReservation";
import axios from "axios";

function Home() {

    const [authorization, setAuthorization] = useState(sessionStorage.getItem('Authorization'));
    const [loginId, setLoginId] = useState(sessionStorage.getItem('LoginID'));
    
    // login이 되어있는지 확인
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                setAuthorization(true);
                setLoginId((id) => sessionStorage.getItem('LoginID'));
            })
            .catch((err) => {
                setAuthorization(false);
            })
    }, []);

    return (
        <Nav>
            <NavBarMenu>
                <LeftMenu><LinkStyle to="/">세종대학교</LinkStyle></LeftMenu>
                <RightMenu>
                    { authorization ? <UserSpan><IconImg src={userwhite} alt="" /> {loginId}님 </UserSpan> : <></>}
                    { authorization ? <LinkStyle to="/logout">로그아웃</LinkStyle> : <LinkStyle to="/loginpage">로그인</LinkStyle>}
                    { authorization ? <LinkStyle to="/selectmeetingroom">예약하기</LinkStyle> : <LinkStyle to="/roomlistpage">회의실 둘러보기</LinkStyle>}
                    { authorization ? <LinkStyle to="/mypage">마이페이지</LinkStyle> : <></>}
                    { authorization ? <LinkStyle to="/announcement">공지사항</LinkStyle> : <></>}
                </RightMenu>
            </NavBarMenu>

            <TodayReservationList/>


            {/* <FooterDiv>
                <FooterLeftContent>
                    <div>세종대학교 예약관리 시스템</div>
                    <div>Email: rooster100@naver.com</div>
                </FooterLeftContent>
                <FooterRightContent>
                    <span>개발자: 김민구, 이병찬, 박지민, 이규훈</span>
                </FooterRightContent>
            </FooterDiv> */}
        </Nav>
    );
}

const Nav = styled.div`
    width: 100%;
    height: 100vh;
    // height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid gray;
    
`

const UserSpan = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`

const FooterDiv = styled.div`
    width: 100%;
    height: 100px;

    margin: 0px;

    display: flex;
    justify-content: space-around;
    background-color: #495057;

    @media screen and (max-width: 600px) {
        display: none;
    }
`

const FooterLeftContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-right: 1px solid white;

    
    flex: 0.5;

    color: white;

    @media screen and (max-width: 900px) {
        font-size: 10px;
    }
`

const FooterRightContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    flex: 0.5;

    @media screen and (max-width: 900px) {
        font-size: 10px;
    }
`

const IconImg = styled.img`
    width: 20px;
    heigth: 20px;

    margin-right: 10px;
`

const LinkStyle = styled(Link)`
  color: white;
  text-decoration: none;
`

const NavBarMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: white;

    width: 100%;
    height: 30px;
    background-color: #A1203C;

    font-size: 17px;
    // padding: 10px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        height: 180px;
        align-items: center;
        justify-content: center;
    }
`

const LeftMenu = styled.div`
    display: flex;
    flex: 1;

    padding: 10px;

    font-weight: bold;
    font-size: 20px;

    margin-left: 10px;
    @media screen and (max-width: 1200px) {
        display: none;
        
    }
`

const RightMenu = styled.div`
    display: flex;
    justify-content: space-around;
    // background-color: black; 

    font-weight: bold;

    flex: 0.7;

    padding: 10px;
    font-size: 20px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        font-size: 20px;
    }
`


export default Home;