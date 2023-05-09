import '../css/AdminSettingPageStyle.css';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

const AdminSettingPage = () => {
    const settings = [
        {
            id: 1,
            role: '학부생',
            reservations: '4번',
            reservationPeriod: '일주일',
            availableTime: '2시간'
        },
        {
            id: 2,
            role: '대학원생',
            reservations: '제한없음',
            reservationPeriod: '2주일',
            availableTime: '4시간'
        },
        {
            id: 3,
            role: '교수',
            reservations: '제한없음',
            reservationPeriod: '3개월',
            availableTime: '제한없음'
        },
        {
            id: 4,
            role: '학과 사무실',
            reservations: '제한없음',
            reservationPeriod: '3개월',
            availableTime: '제한없음'
        }
    ];

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <div className="settings-management">
                <div className="settings-management-container">
                    <div className="header">
                        <h1>세부 설정</h1>
                        <button className="edit-settings-button">
                            수정하기
                        </button>
                    </div>
                    <div className="settings-list">
                        <div className="settings-list-header">
                            <span>권한</span>
                            <span>예약 횟수 설정</span>
                            <span>예약 가능 시간 설정</span>
                            <span>사용 가능 시간 설정</span>
                        </div>
                        {settings.map(setting => (
                            <div key={setting.id} className="settings-row">
                                <span>{setting.role}</span>
                                <span>{setting.reservations}</span>
                                <span>{setting.reservationPeriod} 전</span>
                                <span>{setting.availableTime}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSettingPage;
