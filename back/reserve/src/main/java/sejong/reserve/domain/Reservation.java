package sejong.reserve.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.service.ReservationService;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Setter @Getter @ToString
@Table(name = "reservation_log")
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id; // 예약 번호

    private LocalDateTime start; // 예약 시작 시간
    private LocalDateTime end; // 예약 종료 시간

    @Enumerated(EnumType.STRING)
    private ReservationStatus status; // 예약 상태 RESERVED, FINISHED, CANCELED

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean regular; // 정기 예약 여부

//    @OneToOne(fetch = FetchType.LAZY)
    @OneToOne()
    @JoinColumn(name = "room_id")
    private Room room;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "wait_id")
//    private Waiting waiting;

    @Column(name = "created_at")
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();;


    //==생성 메서드==//
    public static Reservation createReservation(ReservationInfo reservationInfo, Member member, Room room) {
        Reservation reservation = new Reservation();
        reservation.setMember(member);
        reservation.setRoom(room);
        reservation.setStart(reservationInfo.getStart());
        reservation.setEnd(reservationInfo.getEnd());
        reservation.setRegular(reservationInfo.getRegular());
        reservation.setStatus(ReservationStatus.RESERVED);
        return reservation;
    }
}
