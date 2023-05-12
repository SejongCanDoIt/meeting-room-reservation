import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

export default function AdminRoomModifyPage() {
    const room = {
        id: 1,
        name: 'AI센터 613호 회의실',
        description: '대양 AI센터 613호 회의실은 세종대학교 대양AI센터 8층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
        location: '대양 AI센터 613호 회의실은 세종대학교 대양AI센터 8층에 위치해있습니다. 회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.',
        image: 'https://www.kmeetingroom.com/_storage/thumbnails/EGjiXO3iYGEkyTrUCvmNllDLhbkJLh4xATGnzkI2.jpg',
        facilities: {
            chairs: 8,
            wifi: true,
            whiteboard: true,
            projector: true,
            monitors: 2,
            computers: 2,
        },
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
                        <button>변경하기</button>
                    </Header>
                    <RoomInfo>
                        <LeftInfo>
                            <NameBlock>
                                <StyledH2>회의실 이름</StyledH2>
                                <p>{room.name}</p>
                                <hr></hr>
                            </NameBlock>
                            <Block>
                                <StyledH2>회의실 설명</StyledH2>
                                <StyledP>{room.description}</StyledP>
                            </Block>
                            <Block>
                                <StyledH2>회의실 위치</StyledH2>
                                <StyledP>{room.location}</StyledP>
                            </Block>
                        </LeftInfo>
                        <RightInfo>
                            <RoomImg src={room.image} alt={`이미지: ${room.name}`} />
                            <ButtonContainer>
                                <RoomAddButton>사진 추가하기</RoomAddButton>
                            </ButtonContainer>
                            <FacilitiesList>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="의자 아이콘" width="20" height="20" /> {room.facilities.chairs}개</FacilityItem>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="와이파이 아이콘" width="20" height="20" /> {room.facilities.wifi ? '있음' : '없음'}</FacilityItem>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="화이트보드 아이콘" width="20" height="20" /> {room.facilities.whiteboard ? '있음' : '없음'}</FacilityItem>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="모니터 아이콘" width="20" height="20" /> {room.facilities.monitors}개</FacilityItem>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="빔 프로젝터 아이콘" width="20" height="20" /> {room.facilities.projector ? '있음' : '없음'}</FacilityItem>
                                <FacilityItem><FacilityIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="컴퓨터 아이콘" width="20" height="20" /> {room.facilities.computers}개</FacilityItem>
                            </FacilitiesList>
                        </RightInfo>
                    </RoomInfo>
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