import styled from "styled-components";


export default function LoginPage() {
    return (
        <MainContainer>
            <SubContainer>
                <InputContainer>
                    <InputBox>
                        <Ptag>학번</Ptag>
                        <Input type="number"/>
                    </InputBox>
                    <InputBox>
                        <Ptag>비밀번호</Ptag>
                        <Input type="password" />
                    </InputBox>
                </InputContainer>
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

const InputContainer = styled.div`
    // background-color: red;
    width: 80%;
    max-width: 350px;
`

const InputBox = styled.div`
    margin: 3em 0px;
`

const Ptag = styled.p`
    color: #838383;
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #838383;
    width: 100%;
    
    outline: none;
    font-size: 20px;

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
    padding: 5px;
`