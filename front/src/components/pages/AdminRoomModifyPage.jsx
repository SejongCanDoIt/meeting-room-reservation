import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import monitor from "../../assets/monitor.png";
import wifi from "../../assets/wifi2.png";
import whiteboard from "../../assets/blackboard.png";
import computer from "../../assets/computer.png";
import projector from "../../assets/projector.png";
import chair from "../../assets/office-chair.png";

export default function AdminRoomModifyPage() {
    // 회의실 정보 관련
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [roomImage, setRoomImage] = useState('');
    const [roomName, setRoomName] = useState("");
    const [roomInfo, setRoomInfo] = useState("");
    const [roomBuilding, setRoomBuilding] = useState("");
    const [roomFacilities, setRoomFacilities] = useState({});
    const navigate = useNavigate();
    // 스낵바 관련
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

    // 회의실 정보 요청 관련
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`/room/detail/${id}`);
                setRoomData(response.data);
                setRoomId(response.data.id);
                setRoomName(response.data.name);
                setRoomImage(response.data.picture);
                setRoomInfo(response.data.info);
                setRoomBuilding(response.data.buildingName);
                setRoomFacilities({
                    bim_projector: response.data.bim_projector,
                    board: response.data.board,
                    cap: response.data.cap,
                    com: response.data.com,
                    wifi: response.data.wifi,
                    tv: response.data.tv
                });
                console.log("Room Modify Page: ", response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoomData();
    }, [id]);

    if (!roomData) {
        return <p>Loading...</p>;
    }

    // 회의실 정보 수정 관련
    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            id: roomId,
            name: roomName,
            info: roomInfo,
            buildingName: roomBuilding,
            ...roomFacilities,
            empty: true,
            picture: roomImage
        };

        console.log("Data to send: ", dataToSend);

        try {
            const response = await axios.patch(`/room/update`, dataToSend);
            console.log(response);  // 서버 응답을 콘솔에 출력
            handleClickSnackbar('회의실 정보가 성공적으로 변경되었습니다', 'success');
            setTimeout(() => {
                navigate(`/AdminRoomInfoPage/${id}`);
            }, 2000); // 2초의 딜레이를 준 후 페이지 이동
        } catch (error) {
            console.error("회의실 정보 변경에 실패하였습니다.", error);
        }
    };

    // 회의실 이미지 수정
    const handleImageChange = (event) => {
        setRoomImage(event.target.value);
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
                        <button onClick={handleSubmit}>변경하기</button>
                    </Header>
                    <form onSubmit={handleSubmit}>
                        <RoomInfo>
                            <LeftInfo>
                                <NameBlock>
                                    <StyledH2>회의실 이름</StyledH2>
                                    <input
                                        type="text"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                    />
                                    <hr></hr>
                                </NameBlock>
                                <Block>
                                    <StyledH2>회의실 설명</StyledH2>
                                    <textarea
                                        value={roomInfo}
                                        onChange={(e) => setRoomInfo(e.target.value)}
                                    />
                                </Block>
                                <Block>
                                    <StyledH2>회의실 위치</StyledH2>
                                    <select
                                        value={roomBuilding}
                                        onChange={(e) => setRoomBuilding(e.target.value)}
                                    >
                                        <option value="집현관">집현관</option>
                                        <option value="대양홀">대양홀</option>
                                        <option value="모짜르트홀">모짜르트홀</option>
                                        <option value="군자관">군자관</option>
                                        <option value="광개토관">광개토관</option>
                                        <option value="이당관">이당관</option>
                                        <option value="진관홀">진관홀</option>
                                        <option value="용덕관">용덕관</option>
                                        <option value="영실관">영실관</option>
                                        <option value="충무관">충무관</option>
                                        <option value="율곡관">율곡관</option>
                                        <option value="다산관">다산관</option>
                                        <option value="학술정보원">학술정보원</option>
                                        <option value="우정당">우정당</option>
                                        <option value="대양AI센터">대양AI센터</option>
                                        <option value="세종관">세종관</option>
                                        <option value="학생회관">학생회관</option>
                                        <option value="새날관">새날관</option>
                                        <option value="무방관">무방관</option>
                                    </select>
                                </Block>
                            </LeftInfo>
                            <RightInfo>
                                <RoomImgContianer roomImage="http://home.sejong.ac.kr/ImageFileView?imgPath=datafile/wsl/bbs/1393&imgName=6772_1.jpg&imgGubun=NAS" />
                                {/* <RoomImgContianer roomImage={roomImage} />
                                <ButtonContainer>
                                    <StyledInput
                                        type="text"
                                        placeholder="Image URL"
                                        value={roomImage}
                                        onChange={handleImageChange}
                                    />
                                </ButtonContainer> */}
                                <FacilitiesList>
                                    <FacilityItem>
                                        <FacilityIcon src={chair} alt="의자 아이콘" />
                                        <select
                                            value={roomFacilities.cap}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, cap: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src={wifi} alt="와이파이 아이콘" />
                                        <select
                                            value={roomFacilities.wifi}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, wifi: e.target.value }))}
                                        >
                                            <option value={false}>없음</option>
                                            <option value={true}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src={whiteboard} alt="화이트보드 아이콘" />
                                        <select
                                            value={roomFacilities.board}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, board: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src={monitor} alt="모니터 아이콘" />
                                        <select
                                            value={roomFacilities.tv}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, tv: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src={projector} alt="빔 프로젝터 아이콘" />
                                        <select
                                            value={roomFacilities.bim_projector}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, bim_projector: e.target.value }))}
                                        >
                                            <option value={false}>없음</option>
                                            <option value={true}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src={computer} alt="컴퓨터 아이콘" />
                                        <select
                                            value={roomFacilities.com}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, com: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </FacilityItem>
                                </FacilitiesList>
                            </RightInfo>
                        </RoomInfo>
                    </form>
                </RoomInfoContainer>
            </RoomInformation>
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
    padding-left: 10vw;
    padding-top: 7vh;
`;

const RoomInfoContainer = styled.div`
    padding: 20px;

    @media (max-width: 768px) {  
        overflow-y: auto; 
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h1 {
        font-size: 2rem;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

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

    @media (max-width: 768px) {
        flex-direction: column;
    }
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

    input, select {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-weight: bold;
        font-size: large;
    }
`;

const Block = styled.div`
    margin-bottom: 20px;

    input, select, textarea {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
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

/*
const StyledP = styled.p`
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px 10px 20px 10px;
`;
*/

const RoomImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const RoomImgContianer = styled.img.attrs(props => ({
    src: props.roomImage
}))`
    max-width: 550px;
    max-height: 300px;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 20px;
    margin: auto;
`;

const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    text-align: center;
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
    margin-top: 20px;
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