import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

export default function AdminSideBar() {
    const [activeMenu, setActiveMenu] = useState("");
    const [reservationSubmenu, setReservationSubmenu] = useState(false);

    const handleMenuClick = (menu) => {
        if (menu === "reservation") {
            setReservationSubmenu(!reservationSubmenu);
        } else {
            setActiveMenu(menu);
        }
    };

    return (
        <Sidebar>
            <GlobalStyle />
            <ul>
                <MenuItem
                    className={`menu-item ${activeMenu === "membership" ? "active" : ""}`}
                    onClick={() => handleMenuClick("AdminMemberManagePage")}
                >
                    <LinkStyled to="/AdminMemberManagePage">회원 관리</LinkStyled>
                </MenuItem>
                <MenuItem
                    className={`menu-item reservation ${reservationSubmenu ? "active" : ""}`}
                    onClick={() => handleMenuClick("reservation")}
                >
                    예약
                </MenuItem>
                {reservationSubmenu && (
                    <Submenu className="submenu">
                        <SubmenuItem
                            className={`submenu-item ${activeMenu === "reservation-history" ? "active" : ""}`}
                            onClick={() => setActiveMenu("reservation-history")}
                        >
                            예약 내역
                        </SubmenuItem>
                        <SubmenuItem
                            className={`submenu-item ${activeMenu === "reservation-management" ? "active" : ""}`}
                            onClick={() => setActiveMenu("reservation-management")}
                        >
                            <LinkStyled to="/AdminReservManagePage">예약 관리</LinkStyled>
                        </SubmenuItem>
                    </Submenu>
                )}
                <MenuItem
                    className={`menu-item ${activeMenu === "meeting-room" ? "active" : ""}`}
                    onClick={() => handleMenuClick("AdminRoomManagePage")}
                >
                    <LinkStyled to="/AdminRoomManagePage">회의실 관리</LinkStyled>
                </MenuItem>
                <MenuItem
                    className={`menu-item ${activeMenu === "detailed-settings" ? "active" : ""}`}
                    onClick={() => handleMenuClick("detailed-settings")}
                >
                    <LinkStyled to="/AdminSettingPage">세부 설정</LinkStyled>
                </MenuItem>
            </ul>
        </Sidebar>
    );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    a {
    text-decoration: none;
    color: inherit;
    }
    
    ul {
    list-style-type: none;
    }
`;

const Sidebar = styled.div`
    width: 200px;
    background-color: #f1f1f1;
    position: fixed;
    top: 10vh;
    left: 0;
    bottom: 0;
    z-index: 1000;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Submenu = styled.ul`
    display: none;
`;

const MenuItem = styled.li`
    display: block;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:hover {
        color: #A1203C;
    }

    &.reservation::after {
        content: '';
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 2px;
        width: 8px;
        height: 8px;
        border-top: 2px solid currentColor;
        border-right: 2px solid currentColor;
        transform: rotate(-45deg);
        transition: transform 0.3s;
    }

    &.reservation.active::after {
        transform: rotate(135deg);
    }

    &.reservation.active + ${Submenu} {
        display: block;
    }
`;

const SubmenuItem = styled(MenuItem)`
    font-weight: 400;

    &:hover {
        color: #A1203C;
    }
`;
