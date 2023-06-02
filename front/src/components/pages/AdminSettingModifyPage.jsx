import styled from 'styled-components';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import axios from "axios"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';

export default function AdminSettingModifyPage() {
    // 상세 설정 관련
    const [settingList, setSettingList] = useState(null);
    const [univSetting, setUnivSetting] = useState({});
    const [postSetting, setPostSetting] = useState({});
    const [proSetting, setProSetting] = useState({});
    const [officeSetting, setOfficeSetting] = useState({});
    const navigate = useNavigate();
    // 스낵바 관련
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    // 스낵바 관련
    const handleClickSnackbar = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // 권한별로 데이터 세팅
    const processData = (data) => {
        return [
            {
                role: '대학생',
                cnt: `${data.univ_cnt}번`,
                period_time: `${data.univ_hour_gap}시간`,
                period_day: `${data.univ_day_gap}일`,
                period_week: `${data.univ_week_gap}주`
            },
            {
                role: '대학원생',
                cnt: `${data.post_cnt}번`,
                period_time: `${data.post_hour_gap}시간`,
                period_day: `${data.post_day_gap}일`,
                period_week: `${data.post_week_gap}주`
            },
            {
                role: '교수',
                cnt: `${data.pro_cnt}번`,
                period_time: `${data.pro_hour_gap}시간`,
                period_day: `${data.pro_day_gap}일`,
                period_week: `${data.pro_week_gap}주`
            },
            {
                role: '학과 사무실',
                cnt: `${data.office_cnt}번`,
                period_time: `${data.office_hour_gap}시간`,
                period_day: `${data.office_day_gap}일`,
                period_week: `${data.office_week_gap}주`
            }
        ];
    };

    // 세부 설정 정보 요청
    useEffect(() => {
        const fetchSettingListData = async () => {
            try {
                const response = await axios.get(`/manage/`);
                console.log("Response Data: ", response.data);
                const processedData = processData(response.data);
                setSettingList(processedData);
                setUnivSetting({
                    univ_cnt: response.data.univ_cnt,
                    univ_hour_gap: response.data.univ_hour_gap,
                    univ_day_gap: response.data.univ_day_gap,
                    univ_week_gap: response.data.univ_week_gap,
                });
                setPostSetting({
                    post_cnt: response.data.post_cnt,
                    post_hour_gap: response.data.post_hour_gap,
                    post_day_gap: response.data.post_day_gap,
                    post_week_gap: response.data.post_week_gap,
                });
                setProSetting({
                    pro_cnt: response.data.pro_cnt,
                    pro_hour_gap: response.data.pro_hour_gap,
                    pro_day_gap: response.data.pro_day_gap,
                    pro_week_gap: response.data.pro_week_gap,
                });
                setOfficeSetting({
                    office_cnt: response.data.office_cnt,
                    office_hour_gap: response.data.office_hour_gap,
                    office_day_gap: response.data.office_day_gap,
                    office_week_gap: response.data.office_week_gap,
                });
                console.log("Processed Data: ", processedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSettingListData(); // 데이터 받아오기 함수 호출
    }, []);

    if (!settingList) {
        return <p>Loading...</p>; // 데이터 로딩 중에는 로딩 메시지 표시
    }

    // 세부 설정 변경 관련
    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            ...univSetting,
            ...postSetting,
            ...proSetting,
            ...officeSetting,
        };

        console.log("Data to send: ", dataToSend);

        try {
            await axios.patch(`/manage/update`, dataToSend);
            handleClickSnackbar('세부 설정이 성공적으로 변경되었습니다', 'success');
            setTimeout(() => {
                navigate('/AdminSettingPage');
            }, 2000); // 2초의 딜레이를 준 후 페이지 이동
        } catch (error) {
            console.error("세부 설정 변경에 실패하였습니다.", error);
        }
    };

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <SettingsManagement>
                <SettingsManagementContainer>
                    <Header>
                        <h1>세부 설정</h1>
                        <EditSettingsButton onClick={handleSubmit}>
                            변경하기
                        </EditSettingsButton>
                    </Header>
                    <SettingsList>
                        <SettingsListHeader>
                            <span>권한</span>
                            <span>예약 가능 횟수 설정</span>
                            <span>예약 시간 간격 기준: 시간</span>
                            <span>예약 시간 간격 기준: 일</span>
                            <span>예약 시간 간격 기준: 주</span>
                        </SettingsListHeader>
                        <SettingsRow>
                            <span>대학생</span>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={univSetting.univ_cnt}
                                    onChange={(e) =>
                                        setUnivSetting({ ...univSetting, univ_cnt: parseInt(e.target.value) })
                                    }
                                />
                                <span>번</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={univSetting.univ_hour_gap}
                                    onChange={(e) =>
                                        setUnivSetting({ ...univSetting, univ_hour_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>시간</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={univSetting.univ_day_gap}
                                    onChange={(e) =>
                                        setUnivSetting({ ...univSetting, univ_day_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>일</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={univSetting.univ_week_gap}
                                    onChange={(e) =>
                                        setUnivSetting({ ...univSetting, univ_week_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>주</span>
                            </SettingsField>
                        </SettingsRow>
                        <SettingsRow>
                            <span>대학원생</span>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={postSetting.post_cnt}
                                    onChange={(e) =>
                                        setPostSetting({ ...postSetting, post_cnt: parseInt(e.target.value) })
                                    }
                                />
                                <span>번</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={postSetting.post_hour_gap}
                                    onChange={(e) =>
                                        setPostSetting({ ...postSetting, post_hour_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>시간</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={postSetting.post_day_gap}
                                    onChange={(e) =>
                                        setPostSetting({ ...postSetting, post_day_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>일</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={postSetting.post_week_gap}
                                    onChange={(e) =>
                                        setPostSetting({ ...postSetting, post_week_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>주</span>
                            </SettingsField>
                        </SettingsRow>
                        <SettingsRow>
                            <span>교수</span>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={proSetting.pro_cnt}
                                    onChange={(e) =>
                                        setProSetting({ ...proSetting, pro_cnt: parseInt(e.target.value) })
                                    }
                                />
                                <span>번</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={proSetting.pro_hour_gap}
                                    onChange={(e) =>
                                        setProSetting({ ...proSetting, pro_hour_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>시간</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={proSetting.pro_day_gap}
                                    onChange={(e) =>
                                        setProSetting({ ...proSetting, pro_day_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>일</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={proSetting.pro_week_gap}
                                    onChange={(e) =>
                                        setProSetting({ ...proSetting, pro_week_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>주</span>
                            </SettingsField >
                        </SettingsRow >
                        <SettingsRow>
                            <span>학과 사무실</span>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={officeSetting.office_cnt}
                                    onChange={(e) =>
                                        setOfficeSetting({ ...officeSetting, office_cnt: parseInt(e.target.value) })
                                    }
                                />
                                <span>번</span>
                            </SettingsField>
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={officeSetting.office_hour_gap}
                                    onChange={(e) =>
                                        setOfficeSetting({ ...officeSetting, office_hour_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>시간</span>
                            </SettingsField >
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={officeSetting.office_day_gap}
                                    onChange={(e) =>
                                        setOfficeSetting({ ...officeSetting, office_day_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>일</span>
                            </SettingsField >
                            <SettingsField>
                                <SettingsInput
                                    type="number"
                                    value={officeSetting.office_week_gap}
                                    onChange={(e) =>
                                        setOfficeSetting({ ...officeSetting, office_week_gap: parseInt(e.target.value) })
                                    }
                                />
                                <span>주</span>
                            </SettingsField >
                        </SettingsRow >
                    </SettingsList >
                </SettingsManagementContainer >
            </SettingsManagement >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <CustomAlert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </CustomAlert>
            </Snackbar>
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

const SettingsInput = styled.input`
    width: 4vw;
    min-width: 32px;
    text-align: center;
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

const SettingsField = styled.div`
    display: flex;
    align-items: center;
`;

const CustomAlert = styled(MuiAlert)`
    &.MuiAlert-standardSuccess {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardError {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardWarning {
        background-color: #A1203C;
        color: #FFFFFF;
    }
    &.MuiAlert-standardInfo {
        background-color: #A1203C;
        color: #FFFFFF;
    }
`;