import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            <h3> 임시 홈페이지 </h3>
            <Link to='/RoomListPage'><button>회의실 리스트 페이지</button></Link>
            <Link to='/RoomInformationPage'><button>회의실 정보 페이지</button></Link>
            <Link to='/ChangePasswordPage'><button>비밀번호 변경 페이지</button></Link>
            <Link to='/ChangeCompletePage'><button>비밀번호 변경 완료 페이지</button></Link>
            <Link to='/ReservationPage'><button>예약하기 페이지</button></Link>
            <Link to='/ChooseReservationPage'><button>예약 방법 선택 페이지</button></Link>
            <Link to='/ReservationCompletePage'><button>예약 완료 페이지</button></Link>
            <Link to='/ShareReservationPage'><button>예약 공유 페이지</button></Link>
        </div>
    );
}

export default MainPage;