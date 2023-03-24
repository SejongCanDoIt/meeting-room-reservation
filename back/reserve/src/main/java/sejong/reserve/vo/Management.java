package sejong.reserve.vo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "MANAGEMENT")
public class Management {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 예약 가능 횟수
    private int univ_cnt; // 대학생
    private int post_cnt; // 대학원생
    private int pro_cnt; // 교수

    // 예약 시간 간격
    private int univ_gap; // 대학생
    private int post_gap; // 대학원생
    private int pro_gap; // 교수
}
