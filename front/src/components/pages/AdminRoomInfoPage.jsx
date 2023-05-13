import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

export default function AdminRoomInfoPage() {
    const { id } = useParams();
    const [roominfo, setRoominfo] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`/room/detail/${id}`);
                setRoominfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoomData();
    }, [id]);

    if (!roominfo) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <GlobalStyle />
            <AdminTopContainer />
            <AdminSideBar />
            <RoomInformation>
                <RoomInfoContainer>
                    <Header>
                        <h1>회의실 정보</h1>
                        <Link
                            to={{
                                pathname: `/AdminRoomModifyPage/${roominfo.id}`,
                                state: { roomInfo: roominfo }
                            }}
                        >
                            <button>수정하기</button>
                        </Link>
                    </Header>
                    <RoomInfo>
                        <LeftInfo>
                            <NameBlock>
                                <StyledH2>회의실 이름</StyledH2>
                                <p>{roominfo.name}</p>
                                <hr></hr>
                            </NameBlock>
                            <Block>
                                <StyledH2>회의실 설명</StyledH2>
                                <StyledP>{roominfo.info}</StyledP>
                            </Block>
                            <Block>
                                <StyledH2>회의실 위치</StyledH2>
                                <StyledP>{roominfo.loc}</StyledP>
                            </Block>
                        </LeftInfo>
                        <RightInfo>
                            <RoomImg src={roominfo.picture} alt={`이미지: ${roominfo.name}`} />
                            <FacilitiesList>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="의자 아이콘" />
                                    {roominfo.cap}명
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="와이파이 아이콘" />
                                    {roominfo.wifi ? '있음' : '없음'}
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="화이트보드 아이콘" />
                                    {roominfo.board ? '있음' : '없음'}
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="모니터 아이콘" />
                                    {roominfo.tv}개
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="빔 프로젝터 아이콘" />
                                    {roominfo.bim_projector ? '있음' : '없음'}
                                </FacilityItem>
                                <FacilityItem>
                                    <FacilitiesIcon src="https://cdn-icons-png.flaticon.com/512/5219/5219916.png" alt="컴퓨터 아이콘" />
                                    {roominfo.com}개
                                </FacilityItem>
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

const FacilitiesIcon = styled.img`
display: inline-block;
width: 40px;
height: 40px;
`;