package sejong.reserve.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.web.exception.NotEnoughCntException;
import sejong.reserve.web.function.AuthStateConverter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@ToString(exclude = "reservationLogs")
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // 예약자 번호


    @CsvBindByName(column = "성함", locale = "ko-KR", required = true)
    @Column(name = "name")
    private String name; // 회원의 이름

    @CsvBindByName(column = "학번")
    @Column(name = "sno")
    private String studentNo; // 학번 (Login-ID)

    @CsvBindByName(column = "전공", locale = "ko-KR")
    @Column(name = "major", columnDefinition = "VARCHAR(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", length = 512)
    @ColumnDefault("컴퓨터공학과")
    private String major; // 전공

    @CsvBindByName(column = "휴대폰번호")
    @Column(name = "phn")
    private String phoneNo; // 전화번호

    @CsvCustomBindByName(column = "등급", converter = AuthStateConverter.class)
    @Column(name = "auth")
    @Enumerated(EnumType.STRING)
    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE



    @Column(name = "pwd")
    private String password;

    @Column(name = "cnt")
    @ColumnDefault("0")
    private int cnt; // 회원 예약 가능 횟수


    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Reservation> reservationLogs;
}

