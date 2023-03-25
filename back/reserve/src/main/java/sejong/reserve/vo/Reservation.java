package sejong.reserve.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;

@Entity(name = "Reservation_Log")
@Setter @Getter @ToString
@Table(name = "RESERVATION")
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 예약 번호

    private Date start; // 예약 시작 시간
    private Date end; // 예약 종료 시간
    private String status; // 예약 상태
    private Boolean regular; // 정기 예약 여부

    @OneToOne
    @JoinColumn(name = "ROOM_NAME")
    private Room room;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
