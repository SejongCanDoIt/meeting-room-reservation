import { useEffect, useState } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function AuthenticatingPage() {

    const [login, loginDispatch] = useReducer(loginReducer, loginDefault);
    const [loginError, setLoginError] = useState(<></>);
    const [isCheckFail, setIsCheckFail] = useState(false);
    const [isCheckSuccess, setIsCheckSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
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
    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setIsError(false);
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    // 로그인 버튼이 눌렸을때 세션에 정보를 저장하고, /myPage로 라우팅
    const onLoginButtonHandler = async () => {
        handleClick();

        const loginInfo = {
            sno: login.id,
            password: login.password,
        }
        
        console.log("서버로 노쇼 인증을 보냅니다.");
        // setIsCheckFail(true);
        // setIsCheckSuccess(true);
        // await axios
        // .post("/auth/login", {...loginInfo})
        // .then((res) => {
        //     setIsError(false);
        //     sessionStorage.setItem('Authorization', true);
        //     sessionStorage.setItem('LoginID', login.id);
        //     navigate(`/myPage?id=${login.id}`)
        // })
        // .catch(async (err) => {
        //     setIsError(true);
        // });
    }


    return (
        <MainContainer>
            <SubContainer isCheckSuccess = {isCheckSuccess}>
                <Alert variant="outlined" severity="info" sx={{ width:"80%" , maxWidth: "500px"}}>인증을위해 아이디와 비밀번호를 입력해주세요</Alert>
                <InputContainer>
                    <InputBox>
                        {/* <Ptag>학번</Ptag> */}
                        <TextField id="standard-search" label="학번" variant="standard" type="string" sx={{ m: 1, width: '100%' }} onChange={onLoginIdHandler}/> 
                        {/* <Input type="string" onChange={onLoginIdHandler}/> */}
                    </InputBox>
                    <InputBox>
                        {/* <Ptag>비밀번호</Ptag> */}
                        <TextField id="standard-password-input" label="비밀번호" variant="standard" type="password" sx={{ m: 1, width: '100%' }} onChange={onLoginPasswordHandler}/>
                        {/* <Input type="password" onChange={onLoginPasswordHandler}/> */}
                    </InputBox>
                </InputContainer>
                <LoginBtn onClick={onLoginButtonHandler}>인증하기</LoginBtn>
            </SubContainer>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
            
            {/* 인증에 관련된 알림 */}
            {
                isCheckFail ? 
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>인증에 실패하였습니다.</Alert></Snackbar> 
                : 
                <></>
            }
            {
                isCheckSuccess ?
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>인증에 성공하였습니다.</Alert></Snackbar> 
                : 
                <></>
            }
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

    
    
    height: 50vh;
    width: 100%;
`

const InputContainer = styled.div`
    // background-color: red;
    width: 80%;
    max-width: 500px;
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
    max-width: 500px;


    border-radius: 10px;
    padding: 5px;
`
