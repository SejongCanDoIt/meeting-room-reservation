import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

export default function AdminRoomModifyPage() {
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomInfo, setRoomInfo] = useState("");
    const [roomBuilding, setRoomBuilding] = useState("");
    const [roomFacilities, setRoomFacilities] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`/room/detail/${id}`);
                setRoomData(response.data);
                setRoomId(response.data.id);
                setRoomName(response.data.name);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            id: roomId,
            name: roomName,
            info: roomInfo,
            buildingName: roomBuilding,
            ...roomFacilities,
            empty: true,
            picture: roomData.picture
        };

        console.log("Data to send: ", dataToSend);

        try {
            const response = await axios.patch(`/room/update`, dataToSend);
            console.log(response);  // 서버 응답을 콘솔에 출력
            alert("회의실 정보가 성공적으로 변경되었습니다.");
            navigate(`/AdminRoomInfoPage/${id}`);
        } catch (error) {
            console.error("회의실 정보 변경에 실패하였습니다.", error);
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
                        <button onClick={handleSubmit}>변경하기</button>
                    </Header>
                    <form onSubmit={handleSubmit}>
                        <RoomInfo>
                            <LeftInfo>
                                <NameBlock>
                                    <StyledH2>회의실 이름과 ID</StyledH2>
                                    <input
                                        type="text"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                    />
                                    <p>ID: {roomId}</p>
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
                                <RoomImg src={roomData.picture} alt={`이미지: ${roomData.name}`} />
                                <ButtonContainer>
                                    <RoomAddButton>사진 추가하기</RoomAddButton>
                                </ButtonContainer>
                                <FacilitiesList>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/128/664/664374.png" alt="의자 아이콘" />
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
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/128/3562/3562383.png" alt="와이파이 아이콘" />
                                        <select
                                            value={roomFacilities.wifi}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, wifi: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>없음</option>
                                            <option value={1}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/128/8148/8148583.png" alt="화이트보드 아이콘" />
                                        <select
                                            value={roomFacilities.board}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, board: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>없음</option>
                                            <option value={1}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="모니터 아이콘" />
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
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/128/4021/4021963.png" alt="빔 프로젝터 아이콘" />
                                        <select
                                            value={roomFacilities.bim_projector}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, bim_projector: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>없음</option>
                                            <option value={1}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/128/3667/3667881.png" alt="컴퓨터 아이콘" />
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

const ButtonContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const RoomAddButton = styled.button`
    width: 150px;
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        background-color: #8B1B34;
    }
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