import "../css/ChangePasswordPageStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [password, setPassword] = useState();
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [isPrevPasswordOk, setIsPrevPasswordOk] = useState(false);
  const [loginId, setLoginId] = useState("");
  const navigate = useNavigate();

  // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
  useEffect(() => {
    // 서버로부터 로그인 여부 확인
    axios
      .get("/auth/checkLogin")
      .then((res) => {
        // console.log(res);
        setLoginId((id) => res.data);
        // console.log("로그인 되어있습니다")
      })
      .catch((err) => {
        navigate("/loginPage");
      });
  }, []);

  useEffect(() => {
    console.log('패스워드 변경');
    if (isPasswordOk) {
      isPasswordOk();
    }
  }, [isPasswordOk])

  // 기존 비밀번호
  const onPrevPasswordHandler = (e) => {
    const password = e.target.value;
    setPassword((state) => password)
  }
  
  // 새 비밀번호
  const onPasswordHandler = (e) => {
    const password = e.target.value;
    setNewPassword((state) => password);
  };

  // 새 비밀번호 확인
  const onCheckPasswordHandler = (e) => {
    const password = e.target.value; 
    setCheckNewPassword((state) => password);
  }


  const onPasswordSubmitHandler = (e) => {
    e.preventDefault();
    checkPrevPassword();
  };

  const checkPrevPassword = () => {
    const loginInfo = {
      sno: sessionStorage.getItem('LoginID'),
      password: password,
  }
    axios.post("/auth/login", { ...loginInfo })
      .then((res) => {
        (newPassword === checkNewPassword) ? requestChangePassword() : resetPassword();
      })
      .catch((err) => {
        alert("기존 비밀번호가 틀렸습니다.")
      })
  }

  const resetPassword = () => {
    alert("비밀번호 변경에 실패하였습니다. 비밀번호를 확인해주세요.")
  }

  const requestChangePassword = () => {
    axios
      .put(`/member/update-pwd/${loginId}`, null, {
        params: { studentNo: loginId, newPassword: newPassword },
      })
      .then((res) => {
        navigate("/logout");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <MainContainer>
      <SubContainer onSubmit={onPasswordSubmitHandler}>
        <InputContainer>
          <InputBox>
            {/* <Ptag>학번</Ptag> */}
            <TextField
              id="standard-search"
              label="기존 비밀번호"
              variant="standard"
              type="password"
              sx={{ m: 1, width: "100%" }}
              onChange={onPrevPasswordHandler}
            />
          </InputBox>
          <InputBox>
            <TextField
              id="standard-password-input"
              label="새 비밀번호"
              variant="standard"
              type="password"
              sx={{ m: 1, width: "100%" }}
              onChange={onPasswordHandler}
            />
          </InputBox>
          <InputBox>
            <TextField
              id="standard-password-input"
              label="새 비밀번호 확인"
              variant="standard"
              type="password"
              sx={{ m: 1, width: "100%" }}
              onChange={onCheckPasswordHandler}
            />
          </InputBox>
        </InputContainer>
        <LoginBtn>비밀번호 수정</LoginBtn>
      </SubContainer>
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

const LoginBtn = styled.button`
    display: flex;
    justify-content: center;


    background-color: #A1203C;
    color: white;
    font-size: 25px;
    width: 80%;
    max-width: 500px;


    border-radius: 10px;
    padding: 5px;
`

export default ChangePasswordPage;
