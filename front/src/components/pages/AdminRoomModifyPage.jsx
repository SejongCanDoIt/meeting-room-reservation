import React, { useState } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

export default function AdminRoomModifyPage({ initialRoomInfo }) {
    const [room, setRoom] = useState(initialRoomInfo);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setRoom(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/room/update', room);
            alert("회의실 정보가 성공적으로 변경되었습니다.");
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
                                    <StyledH2>회의실 이름</StyledH2>
                                    <input type="text" name="name" value={room.name} onChange={handleChange} required />
                                    <hr></hr>
                                </NameBlock>
                                <Block>
                                    <StyledH2>회의실 설명</StyledH2>
                                    <input type="text" name="info" value={room.info} onChange={handleChange} required />
                                </Block>
                                <Block>
                                    <StyledH2>회의실 위치</StyledH2>
                                    <input type="text" name="loc" value={room.loc} onChange={handleChange} required />
                                </Block>
                            </LeftInfo>
                            <RightInfo>
                                <RoomImg src={room.image} alt={`이미지: ${room.name}`} />
                                <ButtonContainer>
                                    <RoomAddButton>사진 추가하기</RoomAddButton>
                                </ButtonContainer>
                                <FacilitiesList>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="의자 아이콘" width="20" height="20" />
                                        <input type="number" name="facilities.chairs" value={room.facilities.chairs} onChange={handleChange} required />
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="와이파이 아이콘" width="20" height="20" />
                                        <input type="checkbox" name="facilities.wifi" checked={room.facilities.wifi} onChange={handleChange} required />
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="화이트보드 아이콘" width="20" height="20" />
                                        <input type="checkbox" name="facilities.whiteboard" checked={room.facilities.whiteboard} onChange={handleChange} required />
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="모니터 아이콘" width="20" height="20" />
                                        <input type="number" name="facilities.monitors" value={room.facilities.monitors} onChange={handleChange} required />
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="빔 프로젝터 아이콘" width="20" height="20" />
                                        <input type="checkbox" name="facilities.projector" checked={room.facilities.projector} onChange={handleChange} required />
                                    </FacilityItem>
                                    <FacilityItem>
                                        <FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="컴퓨터 아이콘" width="20" height="20" />
                                        <input type="number" name="facilities.computers" value={room.facilities.computers} onChange={handleChange} required />
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