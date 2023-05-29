import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import axios from "axios"

Modal.setAppElement('#root');

export default function AdminReservManagePage() {
    // 예약 취소 기능
    const handleCancelReservation = async (id) => {
        const confirmation = window.confirm('정말 예약을 취소하시겠습니까?'); // 예약 취소 확인 메시지를 표시합니다.
        if (!confirmation) {
            return; // 사용자가 '취소'를 클릭하면 함수를 종료합니다.
        }

        try {
            await axios.delete(`/reserve/delete-one`, { params: { reservation_id: id } });
            setReservList(reservList.filter(reservation => reservation.id !== id));
            window.location.reload(); // 예약 취소가 성공하면 페이지를 새로고침 합니다.
        } catch (error) {
            console.error(error);
        }
    };

    // 모달 관련
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleReservClick = async (sno) => {
        const responseReserv = await axios.get(`/member/${sno}`);
        setSelectedReservation(responseReserv.data);
        setIsOpen(true);
    };

    const handleRoomClick = async (roomId) => {
        const responseRoom = await axios.get(`/room/detail/${roomId}`)
        setSelectedRoom(responseRoom.data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedReservation(null);
        setSelectedRoom(null);
    };

    // 모달 CSS
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
    };

    // 예약 리스트 불러오기
    const [reservList, setReservList] = useState([]);

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
                            <span>예약 상태</span>
                            <span>회의실 ID</span>
                        </ReservationListHeader>
                        {reservList.length === 0 ? (
                            <NoReservationMessage>현재 예약 정보가 없습니다.</NoReservationMessage>
                        ) : (
                            reservList.map(reservation => {
                                const startDate = new Date(reservation.start);
                                const endDate = new Date(reservation.end);
                                const startString = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`;
                                const endString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`;

                                return (
                                    <ReservationRow key={reservation.reservation_id} status={reservation.status}>
                                        <InfoDiv onClick={() => handleReservClick(reservation.member_sno)}>
                                            <span>{reservation.member_sno}</span>
                                            <span>{startString}</span>
                                            <span>{endString}</span>
                                            <span>{reservation.status}</span>
                                        </InfoDiv>
                                        <div onClick={() => handleRoomClick(reservation.room_id)}>
                                            <span>{reservation.room_id}</span>
                                        </div>
                                        <CancelReservation
                                            disabled={reservation.status === 'FINISHED'}
                                            status={reservation.status}
                                            onClick={() => handleCancelReservation(reservation.reservation_id)}
                                        >
                                            예약 취소
                                        </CancelReservation>
                                    </ReservationRow>
                                );
                            })
                        )}
                    </ReservationList>
                </ReservationManagementContainer>
            </ReservationManagement>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Reservation Details"
            >
                {selectedReservation && (
                    <ModalContent>
                        <h2>예약자 정보</h2>
                        <p><b>학과:</b> {selectedReservation.major === 1 ? '컴퓨터공학부' : '기타'}</p>
                        <p><b>학번:</b> {selectedReservation.studentNo}</p>
                        <p><b>이름:</b> {selectedReservation.name}</p>
                        <p><b>전화번호:</b> {selectedReservation.phoneNo}</p>
                        <p><b>이메일:</b> {selectedReservation.email}</p>
                        <p><b>예약 가능 횟수:</b> {selectedReservation.cnt}</p>
                        <p><b>노쇼 횟수:</b> {selectedReservation.noshow}</p>
                        <CloseModalButton onClick={closeModal}>닫기</CloseModalButton>
                    </ModalContent>

                )}
                {selectedRoom && (
                    <ModalContent>
                        <h2>회의실 정보</h2>
                        <p><b>회의실 이름:</b> {selectedRoom.name}</p>
                        <p><b>회의실 ID:</b> {selectedRoom.id}</p>
                        <p><b>회의실 설명:</b> {selectedRoom.info}</p>
                        <p><b>회의실 건물:</b> {selectedRoom.buildingName}</p>
                        <CloseModalButton onClick={closeModal}>닫기</CloseModalButton>
                    </ModalContent>

                )}
            </Modal>
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
    & span {
        font-weight: bold;
    }
`;

const NoReservationMessage = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 30px;
    color: #A1203C;
`;

const InfoDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

const ReservationRow = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
    background-color: ${props => props.status === 'FINISHED' ? '#d3d3d3' : 'white'};
    & span {
        font-weight: normal;
    }
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CloseModalButton = styled.button`
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover {
        background-color: #8B1B34;
    }
`;

const CancelReservation = styled.button`
background-color: ${props => props.status === 'FINISHED' ? '#8B1B34' : '#A1203C'};
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
    &:disabled {
        cursor: not-allowed;
    }
`;