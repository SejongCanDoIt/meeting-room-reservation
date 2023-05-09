import React from 'react';
import '../css/AdminReservManagePageStyle.css';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

const AdminReservManagePage = () => {
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
            <div className="reservation-management">
                <div className="reservation-management-container">
                    <div className="header">
                        <h1>예약 관리</h1>
                    </div>
                    <div className="reservation-list">
                        <div className="reservation-list-header">
                            <span>학과</span>
                            <span>학번</span>
                            <span>이름</span>
                            <span>예약 시간</span>
                        </div>
                        {reservations.map(reservation => (
                            <div key={reservation.id} className="reservation-row">
                                <span>{reservation.department}</span>
                                <span>{reservation.studentId}</span>
                                <span>{reservation.name}</span>
                                <span>{reservation.reservationTime}</span>
                                <button className="cancel-reservation" onClick={handleCancelReservation}>
                                    예약 취소
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminReservManagePage;
