import styled from "styled-components";;

export default function ReservationInfo({subTitle, info}) {
    return (
        <MessageBox>
            <MessageSubTitle>{subTitle}</MessageSubTitle>
            <MessageInfo>{info}</MessageInfo>
        </MessageBox>

    );
}


const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    
    border-top: 1px solid #000000;
    // background-color: gray;
    height: 100px;
    padding: 20px 0px;

`

const MessageSubTitle = styled.div`
    display: flex;
    align-items: flex-end;
    
    width: 100%;
    color: #838383;
    font-size: 15px;
    // background-color: gray;
    height: 25%;
`

const MessageInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;

    font-weight: bold;
    font-size: 20px;
    text-align: center;
    // background-color: red;
`