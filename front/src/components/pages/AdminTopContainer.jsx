import '../css/AdminTopContainerStyle.css'

function AdminTopContainer() {
    return (
        <div id="topContainer">
            <img id="logo" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblEw8g%2FbtqyceLBuz2%2Fe3A21p8V2gwd9hK8X6dC00%2Fimg.jpg" alt="세종대학교 로고"></img>
            <div className="admin-info">
                <p>관리자</p>
                <p>님</p>
                <button><img src="https://cdn-icons-png.flaticon.com/512/3580/3580175.png" alt="로그아웃"></img></button>
            </div>
        </div>
    );
}

export default AdminTopContainer;