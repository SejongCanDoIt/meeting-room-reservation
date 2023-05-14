import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useState } from "react";
import userwhite from "../../assets/userwhite.png";

function Home() {

    const [authorization, setAuthorization] = useState(sessionStorage.getItem('Authorization'));
    const [loginId, setLoginId] = useState(sessionStorage.getItem('LoginID'));

    return (
        <Nav>
            <NavBarMenu>
                <LeftMenu><LinkStyle to="/">세종대학교</LinkStyle></LeftMenu>
                <RightMenu>
                    { authorization ? <UserSpan><IconImg src={userwhite} alt="" /> {loginId}</UserSpan> : <></>}
                    { authorization ? <LinkStyle to="/logout">로그아웃</LinkStyle> : <LinkStyle to="/loginPage">로그인</LinkStyle>}
                    { authorization ? <LinkStyle to="/selectmeetingroom">예약하기</LinkStyle> : <LinkStyle to="/RoomListPage">회의실 둘러보기</LinkStyle>}
                    { authorization ? <LinkStyle to="/myPage">마이페이지</LinkStyle> : <></>}
                </RightMenu>
            </NavBarMenu>

            <ImgBox>
                <HomeTitle>세종대학교 회의실예약 시스템</HomeTitle>
                <Img src="http://www.sejongpr.ac.kr/dataview/sejong_pr/temp/DEI20210428140436.jpg" alt="" />
            </ImgBox>

            <FooterDiv>
                <FooterLeftContent>
                    <div>세종대학교 예약관리 시스템</div>
                    <div>Email: rooster100@naver.com</div>
                </FooterLeftContent>
                <FooterRightContent>
                    <span>김민구, 이병찬, 박지민, 이규훈</span>
                </FooterRightContent>
            </FooterDiv>
            {/* <h3> 임시 홈페이지 </h3> */}
            {/* <Link to='/RoomListPage'><button>회의실 리스트 페이지</button></Link>
            <Link to='/RoomInformationPage'><button>회의실 정보 페이지</button></Link>
            <Link to='/ChangePasswordPage'><button>비밀번호 변경 페이지</button></Link>
            <Link to='/ChangeCompletePage'><button>비밀번호 변경 완료 페이지</button></Link>
            <Link to='/ReservationPage'><button>예약하기 페이지</button></Link>
            <Link to='/ChooseReservationPage'><button>예약 방법 선택 페이지</button></Link>
            <Link to='/ReservationCompletePage'><button>예약 완료 페이지</button></Link>
            <Link to='/ShareReservationPage'><button>예약 공유 페이지</button></Link>
            <Link to='/GoogleCalendar'><button>구글 캘린더</button></Link>
            <Link to='/AdminMemberManagePage'><button>관리자 회원 관리 페이지</button></Link> */}
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

const ImgBox = styled.div`
    width: 100%;
    margin: 0px;

    @media screen and (max-width: 600px) {
        display: none;
    }
`

const HomeTitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute; /* 상위 요소인 .image-container를 기준으로 위치 조정 */
    top: 50%; /* 요소의 높이 기준으로 중앙 정렬 */
    left: 50%; /* 요소의 너비 기준으로 중앙 정렬 */
    transform: translate(-50%, -50%); /* 정렬된 위치에서 좌측 상단 꼭짓점을 기준으로 요소 위치 조정 */
    z-index: 1; /* 텍스트를 이미지 위로 겹쳐서 쓰기 위해 z-index 속성을 설정 */

    color: black;
    font-size: 50px;
    font-weight: bold;


    @media screen and (max-width: 900px) {
        font-size: 40px;
        top: 35%; /* 요소의 높이 기준으로 중앙 정렬 */
        left: 50%; /* 요소의 너비 기준으로 중앙 정렬 */
    }
`

const Img = styled.img`
    position: relative;
    width: 100%;
    opacity: 0.5;
    height: auto;

    z-index: -1;

    @media screen and (max-width: 900px) {
        height: 700px;
    }
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

    @media screen and (max-width: 900px) {
        flex-direction: column;
        height: 100px;
        align-items: center;
        justify-content: center;
    }
`

const LeftMenu = styled.div`
    display: flex;
    flex: 1;

    font-weight: bold;

    margin-left: 10px;
    @media screen and (max-width: 900px) {
        display: none;
        
    }
`

const RightMenu = styled.div`
    display: flex;
    justify-content: space-around;
    // background-color: black; 

    font-weight: bold;

    flex: 0.5;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        font-size: 20px;
    }
`


export default Home;