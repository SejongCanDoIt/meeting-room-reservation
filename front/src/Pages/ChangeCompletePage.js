import './ChangeCompletePageStyle.css';

function ChangeCompletePage() {
    return (
        <div id="changeCompletePageContainer">
            <section id="changeCompleteSection">
                <div id="changeCompleteTitle">
                    <h1>비밀번호 변경이 <br></br> 완료되었어요</h1>
                </div>
                <div className="message">
                    <h4>3초 뒤 마이페이지로 이동합니다</h4>
                </div>
            </section>
        </div>
    );
}

export default ChangeCompletePage;