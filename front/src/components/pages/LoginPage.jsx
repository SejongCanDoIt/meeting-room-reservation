import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const loginDefault = {
    id: "",
    password: null,
}

const loginReducer = (state, action) => {
    switch (action.type) {
        case "ID": {
            return {
                ...state,
                id: action.id,
            }
        }

        case "PASSWORD": {
            return {
                ...state,
                password: action.password,
            }
        }

        default: return state
    }
}

export default function LoginPage() {

    const [login, loginDispatch] = useReducer(loginReducer, loginDefault);
    const navigate = useNavigate();

    const onLoginIdHandler = (e) => {
        loginDispatch({
            type: "ID",
            id: e.target.value,
        })
    }

    const onLoginPasswordHandler = (e) => {
        loginDispatch({
            type: "PASSWORD",
            password: e.target.value,
        })
    }

    const onLoginButtonHandler = () => {
        console.log(`로그인 아이디: ${login.id} 로그인 비밀번호: ${login.password}`);
        alert(`${login.id}님 반갑습니다`);
        navigate("/myPage");
    }


    return (
        <MainContainer>
            <SubContainer>
                <InputContainer>
                    <InputBox>
                        <Ptag>학번</Ptag>
                        <Input type="number" onChange={onLoginIdHandler}/>
                    </InputBox>
                    <InputBox>
                        <Ptag>비밀번호</Ptag>
                        <Input type="password" onChange={onLoginPasswordHandler}/>
                    </InputBox>
                </InputContainer>
                <LoginBtn onClick={onLoginButtonHandler}>로그인</LoginBtn>
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