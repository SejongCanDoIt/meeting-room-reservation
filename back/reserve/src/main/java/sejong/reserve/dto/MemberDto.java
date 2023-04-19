package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@ToString
public class MemberDto {
    private Long id; // 예약자 번호
    private String major; // 전공
    private String studentNo; // 학번 (Login-ID)
    private String phoneNo; // 전화번호
    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE
    private String name; // 회원의 이름
    private String password;
    private int cnt; // 회원 예약 가능 횟수

    public MemberDto(Member loginMember) {
        this.studentNo = loginMember.getStudentNo();
        this.id = loginMember.getId();
        this.major = loginMember.getMajor();
        this.phoneNo = loginMember.getPhoneNo();
        this.authority = loginMember.getAuthority();
        this.name = loginMember.getName();
        this.password = loginMember.getPassword();
        this.cnt = loginMember.getCnt();
    }
}
