import '../css/AdminRoomManagePageStyle.css';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Link } from 'react-router-dom';

/*
<div className="room-list">
    {rooms.map(room => (
        <div key={room.id} className="room-card">
            <Link to={`/AdminRoomInfoPage/${room.id}`}>
                <img src={room.image} alt={`이미지: ${room.name}`} />
                <h2>{room.name}</h2>
                <p>{room.description}</p>
            </Link>
        </div>
    ))}
</div>

App.js에 추가
<Route path="/admin/room-info/:roomId" component={AdminRoomInfoPage} />
*/

const AdminRoomManagePage = () => {
    const rooms = [
        {
            id: 1,
            name: 'AI센터 613호 회의실',
            description: '대양 AI센터 613호 회의실은 세종대학교 대양AI센터 6층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
            image: "https://www.kmeetingroom.com/_storage/thumbnails/EGjiXO3iYGEkyTrUCvmNllDLhbkJLh4xATGnzkI2.jpg"
        },
        {
            id: 2,
            name: 'AI센터 713호 회의실',
            description: '대양 AI센터 713호 회의실은 세종대학교 대양AI센터 6층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
            image: "https://www.kmeetingroom.com/_storage/thumbnails/HRlTPrTYXDrwY7Iydr7IhgaiFkQTq0NQsPybwHWZ.jpg"
        },
        {
            id: 3,
            name: '임시 회의실',
            description: '나중에 회의실이 추가됐을 때 스크롤바가 생기는 지 테스트하기 위한 회의실 데이터',
            image: "https://www.kmeetingroom.com/_storage/thumbnails/BlmpCS0WGkrttLINaBAatozNtXIkcwaIIbuY4ncM.jpg"
        },
    ];

    return (
        <>
            <AdminTopContainer></AdminTopContainer>
            <AdminSideBar></AdminSideBar>
            <div className="meeting-room-management">
                <div className='meeting-room-container'>
                    <div className="header">
                        <h1>회의실 관리</h1>
                        <button>회의실 추가</button>
                    </div>
                    <div className="room-list">
                        {rooms.map(room => (
                            <div key={room.id} className="room-card">
                                <Link to={`/AdminRoomInfoPage`}>
                                    <img src={room.image} alt={`이미지: ${room.name}`} />
                                    <h2>{room.name}</h2>
                                    <p>{room.description}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRoomManagePage;
