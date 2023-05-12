import React from "react";
import styled from 'styled-components';

export default function AdminTopContainer() {
    return (
        <TopContainer>
            <Logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblEw8g%2FbtqyceLBuz2%2Fe3A21p8V2gwd9hK8X6dC00%2Fimg.jpg" alt="세종대학교 로고" />
            <AdminInfo>
                <AdminInfoText>관리자</AdminInfoText>
                <AdminInfoText>님</AdminInfoText>
                <LogoutButton>
                    <LogoutImage src="https://cdn-icons-png.flaticon.com/512/3580/3580175.png" alt="로그아웃" />
                </LogoutButton>
            </AdminInfo>
        </TopContainer>
    );
}

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    border-bottom: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1000;
`;

const Logo = styled.img`
    height: 10vh;
    width: auto;
`;

const AdminInfo = styled.div`
    display: flex;
    align-items: center;
`;

const AdminInfoText = styled.p`
    font-size: 40px;

    &:first-child {
        font-weight: bold;
    }

    &:last-of-type {
        margin-right: 0.4em;
    }
`;

const LogoutButton = styled.button`
    background-color: transparent;
    border: none;
`;

const LogoutImage = styled.img`
    height: 4vh;
    width: auto;
    margin-right: 1vw;
`;