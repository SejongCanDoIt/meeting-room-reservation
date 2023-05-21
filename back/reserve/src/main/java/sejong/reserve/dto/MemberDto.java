package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;

@Getter
@Setter
@ToString
public class MemberDto {
    private Long id; // 예약자 번호
    private String studentNo; // 학번 (Login-ID)
    private String name;
    private int major;
    private String phn;
    private String email;
    private AuthState authority;
    private int reservationCnt;
    private int noShowCnt;

    public MemberDto(Member member) {
        this.studentNo = member.getStudentNo();
        this.id = member.getId();
        this.name = member.getName();
        this.major = member.getMajor();
        this.phn = member.getPhoneNo();
        this.email = member.getEmail();
        this.authority = member.getAuthority();
        this.reservationCnt = member.getCnt();
        this.noShowCnt = member.getNoshow();
    }

}
