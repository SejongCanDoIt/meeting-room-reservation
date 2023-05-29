import styled from "styled-components";

export default function RegularOptions({month, date, isDayReservation, onRegularDay, onRegularTypeHandler, onRegularCountHandler}) {
    return (
        <RegularContainer>
            <h3>{month}월 {date}일부터</h3>
            <SeletedTagBox>
                <SeletedTag name="regularType" id="regular" onChange={onRegularTypeHandler}>
                    <option value="daily">일간</option>
                    <option value="weekly">주간</option>
                    <option value="monthly">월간</option>
                </SeletedTag>
            </SeletedTagBox>
            {
                isDayReservation ? 
                <SeletedTagBox>
                    <SeletedTag name="times" id="times" onChange={onRegularDay}>
                        <option value="1">1일</option>
                        <option value="2">2일</option>
                        <option value="3">3일</option>
                        <option value="4">4일</option>
                        <option value="5">5일</option>
                    </SeletedTag>
                </SeletedTagBox> :
                <></>
            }
            <SeletedTagBox>
                <SeletedTag name="times" id="times" onChange={onRegularCountHandler}>
                    <option value="1">1회</option>
                    <option value="2">2회</option>
                    <option value="3">3회</option>
                </SeletedTag>
            </SeletedTagBox>
        </RegularContainer>

    );
}

const RegularContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-around;

    background-color: #edede9;
    max-width: 350px;

    border-radius: 8px;

    margin-top: 10px;
    // margin-bottom: 10px;
    padding: 5px;
`
const SeletedTagBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 10%;

    flex: 0.5;
    
    // background-color: red;
`

const SeletedTag = styled.select`
    width: 100px;
    height: 30px;

    border: none;
    color: black;
    background-color: #edede9;
    -webkit-border-radius: 0px;

`