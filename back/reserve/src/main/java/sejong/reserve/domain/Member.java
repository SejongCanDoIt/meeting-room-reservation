package sejong.reserve.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter  @Setter @ToString
@Table(name = "member")
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // 에약자 번호
    private String major; // 전공
    @Column(name = "sno")
    private String studentNo; // 학번
    @Column(name = "phn")
    private String phoneNo; // 전화번호
    @Column(name = "auth")
    @Enumerated(EnumType.STRING)
    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE
    private String name; // 회원의 이름
    @Column(name = "pwd")
    private String password;
}
