import styled from "styled-components";
export default function MainPageMenu({icon, title}) {
    return (
        <MenuBox>
            <LeftInfo>
                <UserIcon src={icon} alt="" />
                <TitleInfo>{title}</TitleInfo>
            </LeftInfo>
            <RightInfo>➤</RightInfo>
        </MenuBox>

    );
}


const MenuBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 500px;
    
    border-top: 1px solid #000000;
    padding: 10px 0px;
`

const LeftInfo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 3%;
`

const RightInfo = styled.div`
    margin-right: 3%;
`

const TitleInfo = styled.h4`
    padding-left: 1em;
    font-weight: bold;
    font-size: 25px;
`

const UserIcon = styled.img`
    width: 10%;
    max-width: 500px;
    
    background-color: #A1203C;
    padding:10px;
    border-radius: 10px;
`