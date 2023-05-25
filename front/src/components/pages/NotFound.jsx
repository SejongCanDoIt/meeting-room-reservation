import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const NotFoundBox = styled.div`
    width: 100%;
    height: 80vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

const NotFoundInnerBox = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    width: 90%;
    max-width: 520px;
    height: 30vh;
    border: 1px solid black;
    box-shadow: 2px 3px 5px black;

`
const BackBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-size: 15px;

    width: 130px;
    height: 30px;
    background-color: #212529;
    color: white;
    border: none;
    box-shadow: 2px 3px 3px gray;
    padding: 5px;
`

export default function NotFound(props) {
    const navigate = useNavigate();
    return (
        <NotFoundBox>
            <NotFoundInnerBox>
                <h1>잘못된 주소입니다.</h1>
                <BackBtn onClick={() => navigate('/')}>홈으로</BackBtn>
            </NotFoundInnerBox>
        </NotFoundBox>
    )
}