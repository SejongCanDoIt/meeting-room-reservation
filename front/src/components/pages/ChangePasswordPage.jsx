import '../css/ChangePasswordPageStyle.css';

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
                    <button id="passwordChangeButton">변경</button>
                </div>
            </section >
        </div >
    );
}

export default ChangePasswordPage;