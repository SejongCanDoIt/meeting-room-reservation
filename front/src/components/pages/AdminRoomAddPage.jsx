import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import axios from 'axios'

export default function AdminRoomAddPage() {
    const [roomId, setRoomId] = useState();
    const [roomName, setRoomName] = useState('');
    const [roomInfo, setRoomInfo] = useState('');
    const [roomLocation, setRoomLocation] = useState('');
    const [roomFacilities, setRoomFacilities] = useState({
        cap: 0,
        wifi: 0,
        board: 0,
        tv: 0,
        bim_projector: 0,
        com: 0,
    });
    const [roomImage, setRoomImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            id: roomId,
            name: roomName,
            info: roomInfo,
            loc: roomLocation,
            ...roomFacilities,
            empty: true,
            picture: roomImage,
        };

        console.log(dataToSend);

        try {
            await axios.post(`/room/insert`, dataToSend);
            alert("회의실 정보가 성공적으로 추가되었습니다.");
        } catch (error) {
            console.error("회의실 정보 추가에 실패하였습니다.", error);
        }
    };

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
                        <button onClick={handleSubmit}>추가하기</button>
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
                                    <input
                                        type="test"
                                        value={roomId}
                                        onChange={(e) => setRoomId(parseInt(e.target.value))}
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
                                    <input
                                        type="text"
                                        value={roomLocation}
                                        onChange={(e) => setRoomLocation(e.target.value)}
                                    />
                                </Block>
                            </LeftInfo>
                            <RightInfo>
                                <RoomImgContianer roomImage={roomImage} />
                                <ButtonContainer>
                                    <StyledInput
                                        type="text"
                                        placeholder="Image URL"
                                        value={roomImage}
                                        onChange={handleImageChange}
                                    />
                                    <RoomAddButton>사진 URL 추가하기</RoomAddButton>
                                </ButtonContainer>
                                <FacilitiesList>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="의자 아이콘" />
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
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="와이파이 아이콘" />
                                        <select
                                            value={roomFacilities.wifi}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, wifi: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>없음</option>
                                            <option value={1}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="화이트보드 아이콘" />
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
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="빔 프로젝터 아이콘" />
                                        <select
                                            value={roomFacilities.bim_projector}
                                            onChange={(e) => setRoomFacilities(prevState => ({ ...prevState, bim_projector: parseInt(e.target.value) }))}
                                        >
                                            <option value={0}>없음</option>
                                            <option value={1}>있음</option>
                                        </select>
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="컴퓨터 아이콘" />
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

const RoomImgContianer = styled.img.attrs(props => ({
    src: props.roomImage
}))`
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
    width: 200px;
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
`;

const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
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