package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.Reservation;
import sejong.reserve.domain.ReservationStatus;

import java.time.LocalDateTime;
import java.util.List;

@Setter @Getter @ToString
public class ReservationsDto {
    private LocalDateTime start; // 예약 시작 시간
    private LocalDateTime end; // 예약 종료 시간
    private ReservationStatus status; // 예약 상태 RESERVED, FINISHED, CANCELED
    private Boolean regular; // 정기 예약 여부
    private LocalDateTime created_at; // 예약 생성 시간
    private Long room_id; // 예약된 방의 아이디

    public ReservationsDto() {
    }

    public ReservationsDto(Reservation reservation) {
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
        this.status = reservation.getStatus();
        this.regular = reservation.getRegular();
        this.created_at = reservation.getCreatedAt();
        this.room_id = reservation.getRoom().getId();
    }

    public List<ReservationsDto> reservationsDtoList(List<Reservation> reservations) {
        List<ReservationsDto> reservationDtoList = null;
        for(Reservation reservation:reservations) {
            ReservationsDto reservationsDto = new ReservationsDto(reservation);
            reservationDtoList.add(reservationsDto);
        }
        return reservationDtoList;
    }
}
