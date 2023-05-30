import React from "react";
import styled from 'styled-components';
import axios from "axios"
import logo from "../../assets/sejong_logo.jpg"; 
import logout from "../../assets/logout_black.png"; 
import { useNavigate } from 'react-router-dom';

export default function AdminTopContainer() {
    const navigate = useNavigate();

    // 로그아웃 기능
    const handleLogout = async () => {
        try {
            const response = await axios.get(`/auth/logout`);
            if (response.status === 200) {
                // 로그아웃 요청이 성공하면 클라이언트에서 토큰 삭제
                localStorage.removeItem("token");
                // 로그아웃 후에 Home으로 이동
                navigate("/");
            } else {
                console.log('Logout failed.');
            }
        } catch (err) {
            console.log('Logout error:', err);
        }
    };

    // 로고 클릭 시 홈페이지로 이동
    const handleLogoClick = () => {
        navigate("/AdminMainPage");
    }

    return (
        <TopContainer>
            <Logo onClick={handleLogoClick} src={logo} alt="세종대학교 로고" />
            <AdminInfo>
                <AdminInfoText>관리자</AdminInfoText>
                <AdminInfoText>님</AdminInfoText>
                <LogoutButton onClick={handleLogout}>
                    <LogoutImage src={logout} alt="로그아웃" />
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
    cursor: pointer;
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
    padding-top: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

const LogoutImage = styled.img`
    height: 4vh;
    width: auto;
    margin-right: 1vw;
`;