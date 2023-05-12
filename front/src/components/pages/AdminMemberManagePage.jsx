import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import styled from 'styled-components';

export default function AdminMemberManagePage() {
    const members = [
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            phoneNumber: '010-1234-5678'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            phoneNumber: '010-2345-6789'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            phoneNumber: '010-3456-7890'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            phoneNumber: '010-4567-8901'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            phoneNumber: '010-5678-9012'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            phoneNumber: '010-6789-0123'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            phoneNumber: '010-7890-1234'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            phoneNumber: '010-8901-2345'
        },
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            phoneNumber: '010-1234-5678'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            phoneNumber: '010-2345-6789'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            phoneNumber: '010-3456-7890'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            phoneNumber: '010-4567-8901'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            phoneNumber: '010-5678-9012'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            phoneNumber: '010-6789-0123'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            phoneNumber: '010-7890-1234'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            phoneNumber: '010-8901-2345'
        },
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            phoneNumber: '010-1234-5678'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            phoneNumber: '010-2345-6789'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            phoneNumber: '010-3456-7890'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            phoneNumber: '010-4567-8901'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            phoneNumber: '010-5678-9012'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            phoneNumber: '010-6789-0123'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            phoneNumber: '010-7890-1234'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            phoneNumber: '010-8901-2345'
        },
        {
            id: 1,
            department: '컴퓨터공학과',
            studentId: '12345678',
            name: '홍길동',
            phoneNumber: '010-1234-5678'
        },
        {
            id: 2,
            department: '컴퓨터공학과',
            studentId: '23456789',
            name: '이병찬',
            phoneNumber: '010-2345-6789'
        },
        {
            id: 3,
            department: '컴퓨터공학과',
            studentId: '34567890',
            name: '박지민',
            phoneNumber: '010-3456-7890'
        },
        {
            id: 4,
            department: '컴퓨터공학과',
            studentId: '45678901',
            name: '이규훈',
            phoneNumber: '010-4567-8901'
        },
        {
            id: 5,
            department: '컴퓨터공학과',
            studentId: '56789012',
            name: '김민구',
            phoneNumber: '010-5678-9012'
        },
        {
            id: 6,
            department: '컴퓨터공학과',
            studentId: '67890123',
            name: '마리오',
            phoneNumber: '010-6789-0123'
        },
        {
            id: 7,
            department: '컴퓨터공학과',
            studentId: '78901234',
            name: '루이지',
            phoneNumber: '010-7890-1234'
        },
        {
            id: 8,
            department: '컴퓨터공학과',
            studentId: '89012345',
            name: '피이치',
            phoneNumber: '010-8901-2345'
        },
    ];

    const handleAddMember = () => {
        // 회원 추가 기능 구현
    };

    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <MemberManagement>
                <MemberManagementContainer>
                    <Header>
                        <h1>회원 관리</h1>
                        <AddMemberButton onClick={handleAddMember}>
                            회원 추가
                        </AddMemberButton>
                    </Header>
                    <MemberList>
                        <MemberListHeader>
                            <span>학과</span>
                            <span>학번</span>
                            <span>이름</span>
                            <span>전화번호</span>
                        </MemberListHeader>
                        {members.map(member => (
                            <MemberRow key={member.id}>
                                <span>{member.department}</span>
                                <span>{member.studentId}</span>
                                <span>{member.name}</span>
                                <span>{member.phoneNumber}</span>
                                <DeleteIcon>🗑️</DeleteIcon>
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
    grid-template-columns: 1.5fr 1.5fr 1.5fr 2fr 1fr;
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
    grid-template-columns: 1.5fr 1.5fr 1.5fr 2fr 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    height: 6vh;
`;

const DeleteIcon = styled.span`
    cursor: pointer;
`;