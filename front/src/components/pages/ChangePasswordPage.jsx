import "../css/ChangePasswordPageStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
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

  const onPasswordHandler = (e) => {
    setNewPassword((state) => e.target.value);
  };
  const onPasswordSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/member/update-pwd/${loginId}`, null, {
        params: { studentNo: loginId, newPassword: newPassword },
      })
      .then((res) => {
        console.log(res);
        // navigate('/myPage');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="changePasswordPageContainer">
      <form id="changePasswordSection" onSubmit={onPasswordSubmitHandler}>
        <div id="changePasswordTitle">
          <h1>비밀번호 변경하기</h1>
        </div>
        <div id="inputFormSpace">
          <div id="SubtitleForm">
            <p id="inputFormSubtitle">변경할 비밀번호</p>
            <input
              onChange={onPasswordHandler}
              type="text"
              id="inputForm"
              autoFocus
            ></input>
          </div>
        </div>
        <div id="buttonSpace">
          <button id="passwordChangeButton">변경</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
