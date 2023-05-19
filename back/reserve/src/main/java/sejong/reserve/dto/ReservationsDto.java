package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.Reservation;
import sejong.reserve.domain.ReservationStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter @Getter @ToString
public class ReservationsDto {
    private Long reservation_id;
    private LocalDateTime start; // 예약 시작 시간
    private LocalDateTime end; // 예약 종료 시간
    private ReservationStatus status; // 예약 상태 RESERVED, FINISHED, CANCELED
    private Boolean regular; // 정기 예약 여부
    private LocalDateTime created_at; // 예약 생성 시간
    private Long room_id; // 예약된 방의 아이디

    private String member_sno; // 예약한 사람의 아이디

    private Boolean noShowCheck;

    public ReservationsDto() {
    }

    public ReservationsDto(Reservation reservation) {
        this.reservation_id = reservation.getId();
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
        this.status = reservation.getStatus();
        this.regular = reservation.getRegular();
        this.created_at = reservation.getCreatedAt();
        this.room_id = reservation.getRoom().getId();
        this.noShowCheck = reservation.getNoShowCheck();
        this.member_sno = reservation.getMember().getStudentNo();
    }

    public List<ReservationsDto> reservationsDtoList(List<Reservation> reservations) {
        List<ReservationsDto> reservationDtoList = new ArrayList<>();
        for(Reservation reservation:reservations) {
            ReservationsDto reservationsDto = new ReservationsDto(reservation);
            reservationDtoList.add(reservationsDto);
        }
        return reservationDtoList;
    }
}
