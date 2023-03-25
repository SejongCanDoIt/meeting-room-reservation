package sejong.reserve.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter  @Setter @ToString
@Table(name = "MEMBER")
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 에약자 번호
    private String major; // 전공
    @Column(name = "sno")
    private int studentNo; // 학번
    @Column(name = "phn")
    private String phoneNo; // 전화번호
    @Column(name = "auth")
    private int authority; // 권한 0 < 1 < 2
    private String name; // 회원의 이름

}
