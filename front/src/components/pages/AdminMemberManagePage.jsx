import '../css/AdminMemberManagePageStyle.css';
import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';

const AdminMemberManagePage = () => {
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
            <div className="member-management">
                <div className="member-management-container">
                    <div className="header">
                        <h1>회원 관리</h1>
                        <button className="add-member-button" onClick={handleAddMember}>
                            회원 추가
                        </button>
                    </div>
                    <div className="member-list">
                        <div className="member-list-header">
                            <span>학과</span>
                            <span>학번</span>
                            <span>이름</span>
                            <span>전화번호</span>
                        </div>
                        {members.map(member => (
                            <div key={member.id} className="member-row">
                                <span>{member.department}</span>
                                <span>{member.studentId}</span>
                                <span>{member.name}</span>
                                <span>{member.phoneNumber}</span>
                                <span className="delete-icon">🗑️</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminMemberManagePage;