import React from 'react';
import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

export default function AdminReservManagePage() {
    const reservations = [
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            reservationTime: '2023년 3월 21일 화요일 10:00 ~ 13:00 836호'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            reservationTime: '2023년 3월 21일 화요일 14:00 ~ 17:00 836호'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            reservationTime: '2023년 3월 22일 수요일 09:00 ~ 12:00 836호'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            reservationTime: '2023년 3월 22일 수요일 13:00 ~ 16:00 836호'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            reservationTime: '2023년 3월 23일 목요일 10:00 ~ 13:00 836호'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            reservationTime: '2023년 3월 23일 목요일 14:00 ~ 17:00 836호'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            reservationTime: '2023년 3월 24일 금요일 09:00 ~ 12:00 836호'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            reservationTime: '2023년 3월 24일 금요일 13:00 ~ 16:00 836호'
        },
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            reservationTime: '2023년 3월 21일 화요일 10:00 ~ 13:00 836호'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            reservationTime: '2023년 3월 21일 화요일 14:00 ~ 17:00 836호'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            reservationTime: '2023년 3월 22일 수요일 09:00 ~ 12:00 836호'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            reservationTime: '2023년 3월 22일 수요일 13:00 ~ 16:00 836호'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            reservationTime: '2023년 3월 23일 목요일 10:00 ~ 13:00 836호'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            reservationTime: '2023년 3월 23일 목요일 14:00 ~ 17:00 836호'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            reservationTime: '2023년 3월 24일 금요일 09:00 ~ 12:00 836호'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            reservationTime: '2023년 3월 24일 금요일 13:00 ~ 16:00 836호'
        }
    ];

    const handleCancelReservation = () => {
        // 예약 취소 기능 구현
    };

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
                            <span>학과</span>
                            <span>학번</span>
                            <span>이름</span>
                            <span>예약 시간</span>
                        </ReservationListHeader>
                        {reservations.map(reservation => (
                            <ReservationRow key={reservation.id}>
                                <span>{reservation.department}</span>
                                <span>{reservation.studentId}</span>
                                <span>{reservation.name}</span>
                                <span>{reservation.reservationTime}</span>
                                <CancelReservation onClick={handleCancelReservation}>
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