package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.Member;

@Getter
@Setter
@ToString
public class MemberDto {
    private Long id; // 예약자 번호
    private String studentNo; // 학번 (Login-ID)

    public MemberDto(Member loginMember) {
        this.studentNo = loginMember.getStudentNo();
        this.id = loginMember.getId();
    }

}
