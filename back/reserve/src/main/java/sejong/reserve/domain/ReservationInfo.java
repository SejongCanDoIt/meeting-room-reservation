package sejong.reserve.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter @Getter @ToString
public class ReservationInfo {
    private LocalDateTime start; // 예약 시작 시간
    private LocalDateTime end; // 예약 종료 시간
    private ReservationStatus status; // 예약 상태 RESERVED, FINISHED
    private Boolean regular; // 정기 예약 여부

//    private Room room;
//    private Member member;

}
