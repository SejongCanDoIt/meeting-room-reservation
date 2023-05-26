import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SelectMeetingRoom() {

    const [room, setRoom] = useState([]);

    useEffect(() => {
        console.log(room);
    }, [room])

    useEffect(() => {
        axios.get('/room/list')
            .then((res) => {
                console.log(res.data);
                setRoom((state) => res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <ChooseReservationContainer>
            <div>
                <TitleH>회의실을 선택해주세요</TitleH>
            </div>
            <BtnBox>
                {
                    room.map((it, idx) => (
                        <LinkStyle to={`/choosereservationpage?room_id=${it.id}`}><BtnStyle><h3>{it.buildingName} <br/> {it.name}</h3></BtnStyle></LinkStyle>
                    ))
                }
                {/* <LinkStyle to={`/choosereservationpage?room_id=${835}`}><BtnStyle><h3>835</h3></BtnStyle></LinkStyle>
                <LinkStyle to={`/choosereservationpage?room_id=${836}`}><BtnStyle><h3>836</h3></BtnStyle></LinkStyle> */}
            </BtnBox>
            <div>
                <Ptag>선택시 예약 화면으로 넘어가요</Ptag>
            </div>
        </ChooseReservationContainer>
    );
}

const ChooseReservationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
    // background-color: gray;
`

const TitleH = styled.div`
    font-size: 25px;
    font-weight: bold;
`

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px;
    
    flex-wrap: wrap;
    // background-color: gray;
`

const BtnStyle = styled.button`
    background-color: #99d98c;
    border: none;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;

    color: white;
    font-size: 13px;

    width: 100px;
    height: 100px;
`
const Ptag = styled.p`
    color: gray;
    font-size: 13px;
`

const LinkStyle = styled(Link)`
  color: white;
  text-decoration: none;
`

export default SelectMeetingRoom;