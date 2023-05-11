import styled from "styled-components";

export default function RoomInfo() {
    return (
        <RoomInfoContainer>
            {/* 회의실 사진 */}
            <ImgBox>
                <ImgStlye src="https://images.unsplash.com/photo-1503423571797-2d2bb372094a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" alt="" />
            </ImgBox>
            {/* 회의실 이름 */}
            <RoomName>
                <h2>AI센터 835호 회의실</h2>
                <ReserveBtn>예약</ReserveBtn>
            </RoomName>
            {/* 보유편의 시설 */}
            <FacilityContainer>
                <FacilityBox>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/664/664374.png"/>
                        <p>8개</p>
                    </FacilityContent>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/566/566280.png"/>
                        <p>8개</p>
                    </FacilityContent>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/4021/4021963.png"/>
                        <p>8개</p>
                    </FacilityContent>
                </FacilityBox>
                <FacilityBox>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/8148/8148583.png"/>
                        <p>8개</p>
                    </FacilityContent>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/81/81793.png"/>
                        <p>8개</p>
                    </FacilityContent>
                    <FacilityContent>
                        <FIcon className="facilityIcon" alt="chair" src="https://cdn-icons-png.flaticon.com/512/2004/2004580.png"/>
                        <p>8개</p>
                    </FacilityContent>
                </FacilityBox>
            </FacilityContainer>
            {/* 설명 */}
            <DescriptionBox>
                <ContentP>회의실의 규모는 최대 8명까지 수용이 가능하며 화이트보드와 빔 프로젝트가 포함되어 있는 회의에 최적화된 장소입니다.</ContentP>
            </DescriptionBox>
            {/* 위치 */}
            <LocationBox>
                <ContentP>대양 AI센터 835호 회의실은 세종대학교 대양AI센터 8층에 위치해 있습니다.</ContentP>
            </LocationBox>
        </RoomInfoContainer>

    );
}

const RoomInfoContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // background-color: gray;
`

const ImgBox = styled.div`
    width: 100%;
`

const RoomName = styled.div`
    max-width: 500px;
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

const ImgStlye = styled.img`
    max-width: 500px;
    width: 100%;
    max-height:500px;

    border-radius: 10px;
`

const FacilityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justifty-content: center;
    align-items: center;

    max-width: 500px;
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
`

const DescriptionBox = styled.div`
    max-width: 500px;
    min-height: 100px;
    display: flex;


    // align-items: center;
    justify-content: center;

    border-bottom: 1px solid black;
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