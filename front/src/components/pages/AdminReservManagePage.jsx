import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import axios from "axios"

export default function AdminReservManagePage() {
    const handleCancelReservation = async (id) => {
        try {
            await axios.delete(`/reserve/delete-one`, { params: { reservation_id: id } });
            setReservList(reservList.filter(reservation => reservation.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const [reservList, setReservList] = useState(null);

    useEffect(() => {
        const fetchReservListData = async () => {
            try {
                const response = await axios.get(`/reserve/manager-list`);
                setReservList(response.data);
                console.log("Reserv Manage Page: ", response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReservListData(); // 데이터 받아오기 함수 호출
    }, []);

    if (!reservList) {
        return <p>Loading...</p>; // 데이터 로딩 중에는 로딩 메시지 표시
    }

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <ReservationManagement>
                <ReservationManagementContainer>
                    <Header>
                        <h1>예약 관리</h1>
                    </Header>
                    <ReservationList>
                        <ReservationListHeader>
                            <span>예약자 학번</span>
                            <span>예약 시작 시간</span>
                            <span>예약 종료 시간</span>
                            <span>회의실</span>
                        </ReservationListHeader>
                        {reservList.map(reservation => (
                            <ReservationRow key={reservation.id} status={reservation.status}>
                                <span>{reservation.member_sno}</span>
                                <span>{reservation.start}</span>
                                <span>{reservation.end}</span>
                                <span>{reservation.room_id}</span>
                                <CancelReservation onClick={() => handleCancelReservation(reservation.id)}>
                                    예약 취소
                                </CancelReservation>
                            </ReservationRow>
                        ))}
                    </ReservationList>
                </ReservationManagementContainer>
            </ReservationManagement>
        </>
    );
};

const ReservationManagement = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const ReservationManagementContainer = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ReservationList = styled.div`
    overflow-y: auto;
    max-height: calc(100vh - 10vh - 8vh - 20px);
`;

const ReservationListHeader = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1.5fr 2.3fr 0.7fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
    & span {
        font-weight: bold;
    }
`;

const ReservationRow = styled(ReservationListHeader)`
    background-color: ${props => props.status === 'FINISHED' ? '#d3d3d3' : 'white'};
    & span {
        font-weight: normal;
    }
`;

const CancelReservation = styled.button`
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    width: auto;
    height: 40px;
    &:hover {
        background-color: #8B1B34;
    }
`;