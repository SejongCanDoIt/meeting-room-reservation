package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.ReservationStatus;

import java.time.LocalDateTime;

@Setter @Getter @ToString
public class ReservationDto {
    private LocalDateTime start; // 예약 시작 시간
    private LocalDateTime end; // 예약 종료 시간
    private ReservationStatus status; // 예약 상태 RESERVED, FINISHED, CANCELED
    private Boolean regular; // 정기 예약 여부

}
