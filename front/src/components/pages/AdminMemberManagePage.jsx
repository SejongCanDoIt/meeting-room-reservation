import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import styled from 'styled-components';
import axios from "axios"
import React, { useEffect, useState } from 'react';

export default function AdminMemberManagePage() {
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddMember = async (event) => {
        event.preventDefault();

        if (!file) {
            console.log('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const fileResponse = await axios.post("/excel/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Handle server response here
            if (fileResponse.data.success) {
                console.log(fileResponse.data.message);
            } else {
                console.log(fileResponse.data.message);
            }
        } catch (err) {
            console.log('An error occurred while uploading file.');
        }
    };

    const [memberList, setMemberList] = useState(null);

    useEffect(() => {
        const fetchMemberListData = async () => {
            try {
                const response = await axios.get(`/member/list`);
                setMemberList(response.data);
                console.log("Member Manage Page: ", response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMemberListData(); // 데이터 받아오기 함수 호출
    }, []);

    if (!memberList) {
        return <p>Loading...</p>; // 데이터 로딩 중에는 로딩 메시지 표시
    }

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <MemberManagement>
                <MemberManagementContainer>
                    <Header>
                        <h1>회원 관리</h1>
                        <ButtonContainer>
                            <FileInputLabel htmlFor="fileInput">
                                {file ? file.name : '파일 선택'}
                            </FileInputLabel>
                            <FileInput id="fileInput" type="file" onChange={handleFileUpload} />
                            <AddMemberButton type="submit" onClick={handleAddMember}>회원 추가</AddMemberButton>
                        </ButtonContainer>
                    </Header>
                    <MemberList>
                        <MemberListHeader>
                            <span>학과</span>
                            <span>학번</span>
                            <span>이름</span>
                            <span>전화번호</span>
                            <span>이메일</span>
                            <span>예약 가능 횟수</span>
                            <span>노쇼 횟수</span>
                        </MemberListHeader>
                        {memberList.map(member => (
                            <MemberRow key={member.member_id}>
                                <span>{member.major === 1 ? '컴퓨터공학부' : '기타'}</span>
                                <span>{member.studentNo}</span>
                                <span>{member.name}</span>
                                <span>{member.phoneNo}</span>
                                <span>{member.email}</span>
                                <span>{member.cnt}</span>
                                <span>{member.noshow}</span>
                            </MemberRow>
                        ))}
                    </MemberList>
                </MemberManagementContainer>
            </MemberManagement>
        </>
    );
};

const MemberManagement = styled.div`
    max-width: 100%;
    padding-left: 200px;
    padding-top: 7vh;
`;

const MemberManagementContainer = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FileInput = styled.input`
    display: none; 
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const FileInputLabel = styled.label`
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

const AddMemberButton = styled.button`
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

const MemberList = styled.div`
    overflow-y: auto;
    max-height: calc(100vh - 10vh - 8vh - 20px);
`;

const MemberListHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
    
    & span {
        font-weight: bold;
    }
`;

const MemberRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
`;