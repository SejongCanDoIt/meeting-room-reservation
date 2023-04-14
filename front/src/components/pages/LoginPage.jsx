import { useEffect } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";

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
        // const status = sessionStorage.getItem('loginID');
        // if (status) {
        //     navigate('/myPage');
        // }

        console.log("상태확인");
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                if (res.data) {
                    navigate('/myPage');
                }
            })
            .catch((err) => {
                console.log(err);
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
        console.log(`로그인 아이디: ${login.id} 로그인 비밀번호: ${login.password}`);
        alert(`${login.id}님 반갑습니다`);
        sessionStorage.setItem('loginID', login.id);
        navigate("/myPage");

    //     axios
    //   .post("주소", { ...body })
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log(11, err);
    //   });

    // axios
    //   .post("/auth/login", null, { params: { id: login.id, password: login.password } })
    //   .then((res) => {
    //        console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("로그인 실패", err);
    //   });
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