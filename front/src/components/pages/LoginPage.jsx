import { useEffect } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie";

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

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                console.log(res);
                // console.log("로그인 되어있습니다")
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
    
    // 로그인 버튼이 눌렸을때 세션에 정보를 저장하고, /myPage로 라우팅
    const onLoginButtonHandler = () => {
        const loginInfo = {
            sno: login.id,
            password: login.password,
        }
        axios
        .post("/auth/login", {...loginInfo})
        .then((res) => {
            sessionStorage.setItem('Authorization', true);
            navigate(`/myPage?id=${login.id}`)
        })
        .catch((err) => {
            alert("아이디 또는 비밀번호를 확인해주세요");
        });
    }


    return (
        <MainContainer>
            <SubContainer>
                <InputContainer>
                    <InputBox>
                        <Ptag>학번</Ptag>
                        <Input type="text" onChange={onLoginIdHandler}/>
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