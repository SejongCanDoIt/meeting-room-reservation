import meetingIcon from "../assets/meeting.png";
import styled from "styled-components";


export default function StartPage() {
    return (
        <MainContainer>
            <SubContainer>
                <h1>회의실을 예약해보세요</h1>
                <IconBox><MeetingIcon src={meetingIcon} alt="" /></IconBox>
                <LoginBtn>로그인</LoginBtn>
            </SubContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
`

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    
    // background-color: gray;
    height: 70vh;
    width: 100vw;
`

const IconBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const MeetingIcon = styled.img`
    width: 70%;
    max-width: 300px;
`

const LoginBtn = styled.div`
    display: flex;
    justify-content: center;


    background-color: #A1203C;
    color: white;
    font-size: 1.7em;
    width: 80%;
    max-width: 350px;


    border-radius: 10px;
    padding: 8px;
`