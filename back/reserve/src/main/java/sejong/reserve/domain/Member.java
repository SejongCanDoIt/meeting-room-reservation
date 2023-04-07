package sejong.reserve.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.exception.NotEnoughStockExeption;

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

    @Column(name = "cnt")
    @ColumnDefault("0")
    private int cnt; // 회원 예약 가능 횟수

    // ===비즈니스 로직===== //

    /**
     *
     * cnt 증가
     */
    public void addCnt () {
        this.cnt ++;
    }

    /**
     *
     * cnt 감소
     */
    public void removeCnt () {
        int restStock = this.cnt--;
        if(restStock < 0) {
            throw new NotEnoughStockExeption("no more chance to reserve");
        }
        this.cnt = cnt;
    }

}
