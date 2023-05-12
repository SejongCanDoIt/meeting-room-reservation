import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

export default function AdminSettingPage() {
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
            <SettingsManagement>
                <SettingsManagementContainer>
                    <Header>
                        <h1>세부 설정</h1>
                        <EditSettingsButton>
                            수정하기
                        </EditSettingsButton>
                    </Header>
                    <SettingsList>
                        <SettingsListHeader>
                            <span>권한</span>
                            <span>예약 횟수 설정</span>
                            <span>예약 가능 시간 설정</span>
                            <span>사용 가능 시간 설정</span>
                        </SettingsListHeader>
                        {settings.map(setting => (
                            <SettingsRow key={setting.id}>
                                <span>{setting.role}</span>
                                <span>{setting.reservations}</span>
                                <span>{setting.reservationPeriod} 전</span>
                                <span>{setting.availableTime}</span>
                            </SettingsRow>
                        ))}
                    </SettingsList>
                </SettingsManagementContainer>
            </SettingsManagement>
        </>
    );
};

const SettingsManagement = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const SettingsManagementContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const EditSettingsButton = styled.button`
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover {
        background-color: #8B1B34;
    }
`;

const SettingsList = styled.div`
    margin-top: 20px;
`;

const SettingsListHeader = styled.div`
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
`;

const SettingsRow = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
`;