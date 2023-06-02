import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import styled from 'styled-components';
import axios from "axios"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';


export default function AdminNoticeAddPage() {
    const navigate = useNavigate();
    // 스낵바 관련
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    // 공지사항 추가 관련
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');

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

    // 공지사항 추가 관련
    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            title: noticeTitle,
            content: noticeContent,
        };

        console.log("Data to Send", dataToSend);

        try {
            await axios.post(`/notice/insert`, dataToSend);
            handleClickSnackbar('공지사항 작성이 완료되었습니다', 'success');
            setTimeout(() => {
                navigate('/AdminNoticeManagePage');
            }, 2000); // 2초의 딜레이를 준 후 페이지 이동
        } catch (error) {
            console.error("공지사항 작성에 실패하였습니다.", error);
        }
    };

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <NoticeManagement>
                <NoticeManagementContainer>
                    <Header>
                        <h1>공지사항 작성하기</h1>
                        <AddNoticeButton onClick={handleSubmit}>작성 완료</AddNoticeButton>
                    </Header>
                    <Form onSubmit={event => event.preventDefault()}>
                        <Label>
                            <span>제목</span>
                            <Input type="text" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} required />
                        </Label>
                        <Label>
                            <span>내용</span>
                            <TextArea value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} required />
                        </Label>
                    </Form>
                </NoticeManagementContainer>
            </NoticeManagement>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <CustomAlert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </CustomAlert>
            </Snackbar>
        </>
    );
};

const NoticeManagement = styled.div`
    max-width: 100%;
    padding-left: 10vw;
    padding-top: 7vh;
`;

const NoticeManagementContainer = styled.div`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Input = styled.input`
    margin-top: 10px;
    width: 100%;
`;

const TextArea = styled.textarea`
    margin-top: 10px;
    width: 100%;
    min-height: 400px;
    overflow-y: auto;
`;

const AddNoticeButton = styled.button`
    background-color: #A1203C;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #8B1B34;
    }
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