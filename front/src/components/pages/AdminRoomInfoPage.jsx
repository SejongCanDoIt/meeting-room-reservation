import React from 'react';
import '../css/AdminRoomInfoPageStyle.css';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Link } from 'react-router-dom';

const AdminRoomInfoPage = () => {
    const room = {
        id: 1,
        name: 'AI센터 613호 회의실',
        description: '대양 AI센터 613호 회의실은 세종대학교 대양AI센터 8층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
        location: '대양 AI센터 613호 회의실은 세종대학교 대양AI센터 8층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
        image: 'https://www.kmeetingroom.com/_storage/thumbnails/EGjiXO3iYGEkyTrUCvmNllDLhbkJLh4xATGnzkI2.jpg',
        facilities: {
            chairs: 8,
            wifi: true,
            whiteboard: true,
            projector: true,
            monitors: 2,
            computers: 2,
        },
    };

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <div className="room-information">
                <div className="room-info-container">
                    <div className="header">
                        <h1>회의실 정보</h1>
                        <Link to={`/AdminRoomModifyPage`}><button>수정하기</button></Link>
                    </div>
                    <div className="room-info">
                        <div className="left-info">
                            <div className="name-block">
                                <h2>회의실 이름</h2>
                                <p>{room.name}</p>
                                <hr></hr>
                            </div>
                            <div className="block">
                                <h2>회의실 설명</h2>
                                <p>{room.description}</p>
                            </div>
                            <div className="block">
                                <h2>회의실 위치</h2>
                                <p>{room.location}</p>
                            </div>
                        </div>
                        <div className="right-info">
                            <img className="room-img" src={room.image} alt={`이미지: ${room.name}`} />
                            <ul className='room-facilities'>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="의자 아이콘" width="20" height="20" /> {room.facilities.chairs}개</li>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="와이파이 아이콘" width="20" height="20" /> {room.facilities.wifi ? '있음' : '없음'}</li>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="화이트보드 아이콘" width="20" height="20" /> {room.facilities.whiteboard ? '있음' : '없음'}</li>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="모니터 아이콘" width="20" height="20" /> {room.facilities.monitors}개</li>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="빔 프로젝터 아이콘" width="20" height="20" /> {room.facilities.projector ? '있음' : '없음'}</li>
                                <li><img className='facilities-icon' src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="컴퓨터 아이콘" width="20" height="20" /> {room.facilities.computers}개</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRoomInfoPage;
