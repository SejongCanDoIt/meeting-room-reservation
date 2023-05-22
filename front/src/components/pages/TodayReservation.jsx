import styled from "styled-components";

const TodayContainer = styled.div`
    width: 100%;
    display: flex;;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 0.9;


`

const TodayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    font-weight: bold;
    font-size: 20px;
    border-radius: 20px;

    background-color: #52b788;

    width: 95%;
    height: 100px;
    border-radius: 10px;

`

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function TodayReservationList() {
    return (
        <TodayContainer>
            <ContentBox>
                <h2>오늘의 예약</h2>
                <TodayBox>3건이 있어요</TodayBox>
            </ContentBox>
            <ContentBox>
                <h2>현재 운영중인 회의실</h2>
                <TodayBox>AI센터에 2곳이 운영중에요.</TodayBox>
            </ContentBox>
        </TodayContainer>
    );
}