import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import styled from 'styled-components';
import axios from "axios"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/editIcon.png";


export default function AdminNoticeManagePage() {
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

    // 공지사항 삭제 기능
    const handleDeleteNotice = async (id) => {
        const confirmation = window.confirm('정말 공지사항을 삭제하시겠습니까?'); // 공지사항 삭제 확인 메시지를 표시합니다.
        if (!confirmation) {
            return; // 사용자가 '취소'를 클릭하면 함수를 종료합니다.
        }

        try {
            await axios.delete(`/notice/delete/${id}`);
            setNoticeList(noticeList.filter(notice => notice.id !== id));  // 공지사항 리스트에서 삭제된 공지사항 제거
            handleClickSnackbar("공지사항이 삭제되었습니다.", "success");
        } catch (error) {
            console.error(error);
            handleClickSnackbar("공지사항 삭제에 실패하였습니다.", "error");
        }
    };

    // 공지사항 받아오기
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        const fetchNoticeListData = async () => {
            try {
                const response = await axios.get(`/notice/list`);
                setNoticeList(response.data);
                console.log("Notice Page: ", response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNoticeListData(); // 데이터 받아오기 함수 호출
    }, []);

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <NoticeManagement>
                <NoticeManagementContainer>
                    <Header>
                        <h1>공지사항 관리</h1>
                        <Link to="/AdminNoticeAddPage">
                            <AddNoticeButton>공지사항 작성하기</AddNoticeButton>
                        </Link>
                    </Header>
                    <NoticeList>
                        {noticeList.length === 0 ? (
                            <NoNoticeMessage>현재 공지사항이 없습니다.</NoNoticeMessage>
                        ) : (
                            noticeList.map(notice => {
                                return (
                                    <NoticeRow key={notice.id}>
                                        <NoticeHeader>
                                            <div>{notice.title}</div>
                                            <div>
                                                <EditNoticeButton>
                                                    <Link to={`/AdminNoticeModifyPage/${notice.id}`}>
                                                        <Icon src={editIcon} alt="수정하기 아이콘" />
                                                    </Link>
                                                </EditNoticeButton>
                                                <DeleteNoticeButton onClick={() => handleDeleteNotice(notice.id)}>
                                                    <Icon src={deleteIcon} alt="삭제하기 아이콘" />
                                                </DeleteNoticeButton>
                                            </div>
                                        </NoticeHeader>
                                        <div>{notice.content}</div>
                                    </NoticeRow>
                                );
                            })
                        )}
                    </NoticeList>
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
    padding-left: 200px;
    padding-top: 7vh;
`;

const NoticeManagementContainer = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NoNoticeMessage = styled.p`
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

const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const NoticeHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const NoticeRow = styled.div`
    background-color: #f1f1f1;
    margin: 10px 0;
    padding: 20px;
    border-radius: 4px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
    position: relative;

    div:first-child {
        font-weight: 700;
        font-size: 1.2em;
        margin-bottom: 10px;
    }

    div:last-child {
        color: #555;
    }
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

const Icon = styled.img`
    height: 4vh;
    width: auto;
`;

const EditNoticeButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        opacity: 0.7;
    }
`;

const DeleteNoticeButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
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