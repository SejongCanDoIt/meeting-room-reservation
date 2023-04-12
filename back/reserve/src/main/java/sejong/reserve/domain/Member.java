package sejong.reserve.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.exception.NotEnoughCntException;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter  @Setter @ToString
@Table(name = "member")
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // 예약자 번호


    private String major; // 전공
    @Column(name = "sno")
    private String studentNo; // 학번 (Login-ID)
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
        int restCnt = this.cnt--;
        if(restCnt < 0) {
            throw new NotEnoughCntException("No more chance to reserve");
        }
        this.cnt = cnt;
    }
    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private Reservation reservation_log;
}
