import { useEffect, useState } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

export default function LoginPage() {

    const [login, loginDispatch] = useReducer(loginReducer, loginDefault);
    const [loginError, setLoginError] = useState(<></>);
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                console.log(res);
                console.log("로그인 되어있습니다")
                navigate('/myPage')
            })
            .catch((err) => {
                navigate('/loginPage')
            })
    }, []);

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
    const onLoginButtonHandler = async (e) => {
        handleClick();
        
        e.preventDefault();
        const loginInfo = {
            sno: login.id,
            password: login.password,
        }
        await axios
            .post("/auth/login", { ...loginInfo })
            .then((res) => {
                setIsError(false);
                sessionStorage.setItem('Authorization', true);
                sessionStorage.setItem('LoginID', login.id);
    
                // id가 "admin"인 경우 AdminMemberPage로 이동
                if(login.id === "admin") {
                    navigate('/AdminMemberManagePage')
                } else {
                    navigate(`/myPage?id=${login.id}`)
                }
            })
            .catch(async (err) => {
                setIsError(true);
            });
    }


    return (
        <MainContainer>
            <SubContainer onSubmit={onLoginButtonHandler}>
                <InputContainer>
                    <InputBox>
                        {/* <Ptag>학번</Ptag> */}
                        <TextField id="standard-search" label="학번" variant="standard" type="string" sx={{ m: 1, width: '100%' }} onChange={onLoginIdHandler} />
                        {/* <Input type="string" onChange={onLoginIdHandler}/> */}
                    </InputBox>
                    <InputBox>
                        {/* <Ptag>비밀번호</Ptag> */}
                        <TextField id="standard-password-input" label="비밀번호" variant="standard" type="password" sx={{ m: 1, width: '100%' }} onChange={onLoginPasswordHandler} />
                        {/* <Input type="password" onChange={onLoginPasswordHandler}/> */}
                    </InputBox>
                </InputContainer>
                <LoginBtn>로그인</LoginBtn>
            </SubContainer>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

            {/* 입력된 정보가 다를때 나오는 알림 */}
            {isError ?
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>아이디 또는 비밀번호가 잘못되었습니다.</Alert></Snackbar>
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

const SubContainer = styled.form`
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



const LoginBtn = styled.button`
    display: flex;
    justify-content: center;


    background-color: #A1203C;
    color: white;
    font-size: 23px;
    width: 80%;
    max-width: 500px;


    border-radius: 10px;
    padding: 5px;
`