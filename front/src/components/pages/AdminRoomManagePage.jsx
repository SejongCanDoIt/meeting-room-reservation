import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Link } from 'react-router-dom';
import axios from "axios"

export default function AdminRoomManagePage() {
    // 회의실 리스트 받아오기
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        const fetchRoomListData = async () => {
            try {
                const response = await axios.get(`/room/list`); // 실제 API 엔드포인트와 room id를 조합하여 요청
                setRoomList(response.data); // 받아온 데이터로 roomInfo 상태 업데이트
                console.log("Room Manage Page: ", response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoomListData(); // 데이터 받아오기 함수 호출
    }, []); // roomId가 변경될 때마다 실행

    if (!roomList) {
        return <p>Loading...</p>; // 데이터 로딩 중에는 로딩 메시지 표시
    }

    return (
        <>
            <GlobalStyle />
            <AdminTopContainer />
            <AdminSideBar />
            <MeetingRoomManagement>
                <MeetingRoomContainer>
                    <Header>
                        <h1>회의실 관리</h1>
                        <Link to="/AdminRoomAddPage">
                            <button>회의실 추가</button>
                        </Link>
                    </Header>
                    <RoomList>
                        {roomList.length === 0 ? (
                            <NoRoomMessage>현재 사용 가능한 회의실이 없습니다.</NoRoomMessage>
                        ) : (
                            roomList.map(room => {
                                return (
                                    <RoomCard key={room.id}>
                                        <Link to={`/AdminRoomInfoPage/${room.id}`}>
                                            <RoomImage src={room.picture} alt={`이미지: ${room.name}`} />
                                            <h2>{room.name}</h2>
                                            <p>{room.info}</p>
                                        </Link>
                                    </RoomCard>
                                );
                            })
                        )}
                    </RoomList>
                </MeetingRoomContainer>
            </MeetingRoomManagement>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    overflow-x: hidden;
    overflow-y: hidden;
    }
`

const MeetingRoomManagement = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const MeetingRoomContainer = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    button {
        background-color: #A1203C;
        color: #ffffff;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            background-color: #8a1c33;
        }
    }
`;

const NoRoomMessage = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 30px;
    color: #A1203C;
    margin: auto;
`;

const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 40px;
    column-gap: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 10vh - 8vh - 20px);
    padding-right: 10px;
`;

const RoomCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 48%;

    a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
    }
`;

const RoomImage = styled.img`
    max-width: 100vw;
    max-height: 30vh;  
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    margin: auto;
`;