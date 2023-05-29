import styled from "styled-components";
import { useSearchParams, Link} from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import user from "../../assets/user.png";

const initialRoomInfoData = {
    "bim_projector": 0,
    "board": 0,
    "cap": 0,
    "com": 0,
    "tv": 0,
    "wifi": 0,
}

export default function RoomInfo() {

    const [serchParams, setSearchParams] = useSearchParams();
    const [roomInfoData, setRoomInfoData] = useState(initialRoomInfoData);

    useEffect(() => {
        axios.get(`/room/detail/${serchParams.get('room_id')}`) 
            .then((res) => {
                const data = res.data;
                console.log(data);
                const roomData = {
                    "info": data.info,
                    "bim_projector": data.bim_projector,
                    "board": data.board,
                    "cap": data.cap,
                    "com": data.com,
                    "tv": data.tv,
                    "wifi": data.wifi,
                    "picture": data.picture.length ? data.picture : "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                }
                setRoomInfoData((state) => roomData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <RoomInfoContainer>
            {/* 회의실 사진 */}
            <ImgContainer>
                <ImgStlye src={roomInfoData.picture} alt="" />
            </ImgContainer>
            {/* 회의실 이름 */}
            <ContentContainer>
                <RoomName>
                    <h2>{serchParams.get('location')} {serchParams.get('room_id')}호 회의실</h2>
                    <LinkTag to={`/ChooseReservationPage?room_id=${serchParams.get('room_id')}`}><ReserveBtn>예약</ReserveBtn></LinkTag>
                </RoomName>
                {/* 보유편의 시설 */}
                <FacilityContainer>
                    <FacilityBox>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src={user}/>
                            <Ptag>{roomInfoData.cap}명</Ptag>
                        </FacilityContent>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/566/566280.png"/>
                            {roomInfoData.wifi ? <Ptag>사용가능</Ptag> : <Ptag>사용불가</Ptag>}
                        </FacilityContent>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/4021/4021963.png"/>
                            {roomInfoData.bim_projector ? <Ptag>사용가능</Ptag> : <Ptag>사용불가</Ptag>}
                        </FacilityContent>
                    </FacilityBox>
                    <FacilityBox>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/8148/8148583.png"/>
                            <Ptag>{roomInfoData.board}개</Ptag>
                        </FacilityContent>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/81/81793.png"/>
                            <Ptag>{roomInfoData.tv}개</Ptag>
                        </FacilityContent>
                        <FacilityContent>
                            <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/2004/2004580.png"/>
                            <Ptag>{roomInfoData.com}개</Ptag>
                        </FacilityContent>
                    </FacilityBox>
                </FacilityContainer>
                {/* 설명 */}
                <DescriptionBox>
                    <ContentP>{roomInfoData.info}</ContentP>
                </DescriptionBox>
                {/* 위치 */}
                {/* <LocationBox>
                    <ContentP>대양 AI센터 835호 회의실은 세종대학교 대양AI센터 8층에 위치해 있습니다.</ContentP>
                </LocationBox> */}
            </ContentContainer>
        </RoomInfoContainer>

    );
}

const LinkTag = styled(Link)`
    text-decoration: none;
`

const Ptag = styled.p`
    font-size: 11px;
    // font-weight: bold;
`

const RoomInfoContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // background-color: gray;
`

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    align-items: center;
    // justify-content: center;
    // background-color: gray;
`

const ImgContainer =  styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-itmes: center;

    // background-color: gray;
    
`

const ImgStlye = styled.img`
    max-width: 600px;
    width: 100%;
    height: auto;
    max-height:400px;

    z-index: -1;

    border-radius: 10px;

    // border-bottom-right-radius: 10px;
    // border-bottom-left-radius: 10px;
    // background-color: gray;

    
`

const ImgBox = styled.div`
    // width: 100%;
    // background-color: gray;
    
    box-shadow: 3px 5px 10px #8d99ae;
    border-radius: 10px;
`

const RoomName = styled.div`
    max-width: 500px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    border-bottom: 1px solid black;

    // background-color: red;
`

const ReserveBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-size: 15px;

    width: 100px;
    height: 20px;
    background-color: #0096c7;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 15px;
`

const FacilityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justifty-content: center;
    align-items: center;

    max-width: 500px;
    width: 100%;
    border-bottom: 1px solid black;
    // background-color: red;
`

const FacilityBox = styled.div`
    width: 100%;
    max-width: 500px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 20px 0px;

`

const FIcon = styled.img`
    width: 30px;
    height: 30px;

    margin-right: 8px;
`

const FacilityContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    // background-color: gray;

    width: 100px;
`

const DescriptionBox = styled.div`
    max-width: 500px;
    min-height: 100px;
    display: flex;


    // align-items: center;
    // justify-content: center;
    text-align: center;

    // border-bottom: 1px solid black;
`

const LocationBox = styled.div`
    max-width: 500px;
    display: flex;
    justify-content: center;
    // align-items: center;


    // margin-top: 10px;
    // background-color: gray;
`

const ContentP = styled.p`
    width: 90%;
`