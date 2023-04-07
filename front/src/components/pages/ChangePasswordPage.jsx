import '../css/ChangePasswordPageStyle.css';
import { Link } from 'react-router-dom';

function ChangePasswordPage() {
    return (
        <div id="changePasswordPageContainer">
            <section id="changePasswordSection">
                <div id="changePasswordTitle">
                    <h1>비밀번호 변경하기</h1>
                </div>
                <div id="inputFormSpace">
                    <div id="SubtitleForm">
                        <p id="inputFormSubtitle">변경할 비밀번호</p>
                        <input type="text" id="inputForm" autoFocus></input>
                    </div>
                </div>
                <div id="buttonSpace">
                    <Link to='/ChangeCompletePage'>
                        <button id="passwordChangeButton">변경</button>
                    </Link>
                </div>
            </section >
        </div >
    );
}

export default ChangePasswordPage;