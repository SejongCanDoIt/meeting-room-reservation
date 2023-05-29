import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import axios from 'axios'
import monitor from "../../assets/monitor.png";
import wifi from "../../assets/wifi2.png";
import whiteboard from "../../assets/blackboard.png";
import computer from "../../assets/computer.png";
import projector from "../../assets/projector.png";
import chair from "../../assets/office-chair.png";

export default function AdminRoomInfoPage() {
    const { id } = useParams();
    const [roomInfo, setRoomInfo] = useState(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    // 스낵바 관련
    const handleClickSnackbar = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // 정보 요청 관련
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`/room/detail/${id}`);
                console.log("API response: ", response);
                setRoomInfo(response.data);
                console.log("Room Info Page: ", response.data);
            } catch (error) {
                console.error("Error response: ", error.response);
                handleClickSnackbar('Error fetching room data', 'error');
            }
        };

        fetchRoomData();
    }, [id]);

    if (!roomInfo) {
        return <p>Loading...</p>;
    }

    // 회의실 삭제 관련
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.delete(`/room/delete/${id}`);
                handleClickSnackbar('회의실 삭제가 완료되었습니다', 'success');
                setTimeout(() => {
                    navigate('/AdminRoomManagePage');
                }, 2000); // 2초의 딜레이를 준 후 페이지 이동
            } catch (error) {
                console.error(error);
                handleClickSnackbar('회의실을 삭제하는 동안 오류가 발생했습니다', 'error');
            }
        }
    };

    return (
        <>
            <GlobalStyle />
            <AdminTopContainer />
            <AdminSideBar />
            <RoomInformation>
                <RoomInfoContainer>
                    <Header>
                        <h1>회의실 정보</h1>
                        <button onClick={handleDelete}>삭제하기</button>
                        <Link to={`/AdminRoomModifyPage/${roomInfo.id}`}>
                            <button>수정하기</button>
                        </Link>
                    </Header>
                    <RoomInfo>
                        <LeftInfo>
                            <NameBlock>
                                <StyledH2>회의실 이름</StyledH2>
                                <p>{roomInfo.name}</p>
                                <hr></hr>
                            </NameBlock>
                            <Block>
                                <StyledH2>회의실 설명</StyledH2>
                                <StyledP>{roomInfo.info}</StyledP>
                            </Block>
                            <Block>
                                <StyledH2>회의실 위치</StyledH2>
                                <StyledP>{roomInfo.name}은 {roomInfo.buildingName}에 위치하고 있습니다.</StyledP>
                            </Block>
                        </LeftInfo>
                        <RightInfo>
                            <RoomImg src={roomInfo.picture} alt={`이미지: ${roomInfo.name}`} />
                            <FacilitiesList>
                                <FacilityItem>
                                    <FacilityIcon src={chair} alt="의자 아이콘" />
                                    {roomInfo.cap}명
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilityIcon src={wifi} alt="와이파이 아이콘" />
                                    {roomInfo.wifi ? '있음' : '없음'}
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilityIcon src={whiteboard} alt="화이트보드 아이콘" />
                                    {roomInfo.board}개
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilityIcon src={monitor} alt="모니터 아이콘" />
                                    {roomInfo.tv}개
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilityIcon src={projector} alt="빔 프로젝터 아이콘" />
                                    {roomInfo.bim_projector ? '있음' : '없음'}
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilityIcon src={computer} alt="컴퓨터 아이콘" />
                                    {roomInfo.com}개
                                </FacilityItem>
                            </FacilitiesList>
                        </RightInfo>
                    </RoomInfo>
                </RoomInfoContainer>
            </RoomInformation >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <CustomAlert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </CustomAlert>
            </Snackbar>
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
`;

const RoomInformation = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const RoomInfoContainer = styled.div`
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

const RoomInfo = styled.div`
    display: flex;
    justify-content: space-between;
    height: 70vh;
`;

const LeftInfo = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const NameBlock = styled.div`
    margin-bottom: 20px;

    p {
        font-weight: bold;
        font-size: large;
        margin-bottom: 10px;
    }
`;

const Block = styled.div`
    margin-bottom: 20px;

    p {
        background-color: #f1f1f1;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px 10px 20px 10px;
    }
`;

const RightInfo = styled.div`
    flex: 1;
    margin: 0 20px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const StyledH2 = styled.h2`
    margin-bottom: 15px;
    color: #A1203C;
`;

const StyledP = styled.p`
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px 10px 20px 10px;
`;

const RoomImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const FacilitiesList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    flex-grow: 1;
`;

const FacilityItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
`;

const FacilityIcon = styled.img`
display: inline-block;
width: 40px;
height: 40px;
`;

const CustomAlert = styled(MuiAlert)`
    &.MuiAlert-standardSuccess {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardError {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardWarning {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardInfo {
        background-color: #A1203C;
        color: #FFFFFF;
    }
`;