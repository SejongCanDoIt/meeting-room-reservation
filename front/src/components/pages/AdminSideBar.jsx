import React, { useState } from "react";
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
                    onClick={() => handleMenuClick("membership")}
                >
                    회원관리
                </li>
                <li
                    className={`menu-item reservation ${reservationSubmenu ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("reservation")}
                >
                    예약
                    <span className={`arrow ${reservationSubmenu ? "up" : "down"}`} />
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
                            예약 관리
                        </li>
                    </ul>
                )}
                <li
                    className={`menu-item ${activeMenu === "meeting-room" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("meeting-room")}
                >
                    회의실 관리
                </li>
                <li
                    className={`menu-item ${activeMenu === "detailed-settings" ? "active" : ""
                        }`}
                    onClick={() => handleMenuClick("detailed-settings")}
                >
                    세부 설정
                </li>
            </ul>
        </div>
    );
};

export default AdminSideBar;