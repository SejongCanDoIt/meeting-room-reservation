import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/AdminSideBarStyle.css";

const AdminSideBar = () => {
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
        <div className="sidebar">
            <ul>
                <li
                    className={`menu-item ${activeMenu === "membership" ? "active" : ""}`}
                    onClick={() => handleMenuClick("AdminMemberManagePage")}
                >
                    <Link to="/AdminMemberManagePage">회원 관리</Link>
                </li>
                <li
                    className={`menu-item reservation ${reservationSubmenu ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("reservation")}
                >
                    예약
                </li>
                {reservationSubmenu && (
                    <ul className="submenu">
                        <li
                            className={`submenu-item ${activeMenu === "reservation-history" ? "active" : ""
                                }`}
                            onClick={() => setActiveMenu("reservation-history")}
                        >
                            예약 내역
                        </li>
                        <li
                            className={`submenu-item ${activeMenu === "reservation-management" ? "active" : ""
                                }`}
                            onClick={() => setActiveMenu("reservation-management")}
                        >
                            <Link to="/AdminReservManagePage">예약 관리</Link>
                        </li>
                    </ul>
                )}
                <li
                    className={`menu-item ${activeMenu === "meeting-room" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("AdminRoomManagePage")}
                >
                    <Link to="/AdminRoomManagePage">회의실 관리</Link>
                </li>
                <li
                    className={`menu-item ${activeMenu === "detailed-settings" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("detailed-settings")}
                >
                    <Link to="/AdminSettingPage">세부 설정</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSideBar;