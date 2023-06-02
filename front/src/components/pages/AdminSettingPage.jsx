import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import axios from "axios"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminSettingPage() {
    const [settingList, setSettingList] = useState([]);

    // 세부 설정 데이터 처리
    const processData = (data) => {
        return [
            {
                id: data.id,
                role: '대학생',
                cnt: `${data.univ_cnt}번`,
                period_time: `${data.univ_hour_gap}시간`,
                period_day: `${data.univ_day_gap}일`,
                period_week: `${data.univ_week_gap}주`
            },
            {
                id: data.id,
                role: '대학원생',
                cnt: `${data.post_cnt}번`,
                period_time: `${data.post_hour_gap}시간`,
                period_day: `${data.post_day_gap}일`,
                period_week: `${data.post_week_gap}주`
            },
            {
                id: data.id,
                role: '교수',
                cnt: `${data.pro_cnt}번`,
                period_time: `${data.pro_hour_gap}시간`,
                period_day: `${data.pro_day_gap}일`,
                period_week: `${data.pro_week_gap}주`
            },
            {
                id: data.id,
                role: '학과 사무실',
                cnt: `${data.office_cnt}번`,
                period_time: `${data.office_hour_gap}시간`,
                period_day: `${data.office_day_gap}일`,
                period_week: `${data.office_week_gap}주`
            }
        ];
    };

    // 세부 설정 받아오기
    useEffect(() => {
        const fetchSettingListData = async () => {
            try {
                const response = await axios.get(`/manage/`);
                console.log("Setting Page: ", response.data);
                const processedData = processData(response.data);
                setSettingList(processedData);
                console.log(processedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSettingListData(); // 데이터 받아오기 함수 호출
    }, []);

    if (!settingList) {
        return <p>Loading...</p>; // 데이터 로딩 중에는 로딩 메시지 표시
    }

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <SettingsManagement>
                <SettingsManagementContainer>
                    <Header>
                        <h1>세부 설정</h1>
                        <Link to={`/AdminSettingModifyPage/`}>
                            <EditSettingsButton>수정하기</EditSettingsButton>
                        </Link>
                    </Header>
                    <SettingsList>
                        <SettingsListHeader>
                            <span>권한</span>
                            <span>예약 가능 횟수 설정</span>
                            <span>예약 시간 간격 기준: 시간</span>
                            <span>예약 시간 간격 기준: 일</span>
                            <span>예약 시간 간격 기준: 주</span>
                        </SettingsListHeader>
                        {settingList.length === 0 ? (
                            <NoSettingMessage>초기 세부 설정을 해주세요.</NoSettingMessage>
                        ) : (
                            settingList.map(setting => {
                                return (
                                    <SettingsRow key={setting.id}>
                                        <span>{setting.role}</span>
                                        <span>{setting.cnt}</span>
                                        <span>{setting.period_time}</span>
                                        <span>{setting.period_day}</span>
                                        <span>{setting.period_week}</span>
                                    </SettingsRow>
                                );
                            })
                        )}
                    </SettingsList>
                </SettingsManagementContainer>
            </SettingsManagement>
        </>
    );
};

const SettingsManagement = styled.div`
    max-width: 100%;
    padding-left: 10vw;
    padding-top: 7vh;
`;

const SettingsManagementContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h1 {
        font-size: 2rem;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }
`;

const EditSettingsButton = styled.button`
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover {
        background-color: #8B1B34;
    }
`;

const NoSettingMessage = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 30px;
    color: #A1203C;
`;

const SettingsList = styled.div`
    margin-top: 20px;
`;

const SettingsListHeader = styled.div`
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-items: center;

    span {
        font-size: 1rem;

        @media (max-width: 768px) {
            font-size: 0.5rem;
        }
    }
`;

const SettingsRow = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-items: center;
`;