package sejong.reserve.service;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Reservation;
import sejong.reserve.dto.ReservationDto;
import sejong.reserve.dto.ReservationsDto;
import sejong.reserve.repository.ReservationRepository;

import java.time.LocalDateTime;
import java.util.List;



@RequiredArgsConstructor
@Service
public class EmailNotificationService {
    private JavaMailSender javaMailSender;
    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    // Reservation -> ReservationDto 변환 메서드
    public ReservationDto convertToDto(Reservation reservation) {
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setStart(reservation.getStart());
        reservationDto.setEnd(reservation.getEnd());
        reservationDto.setStatus(reservation.getStatus());
        reservationDto.setRegular(reservation.getRegular());

        return reservationDto;
    }

    // 스케줄러 코드
    @Scheduled(cron = "0 0 * * * *")
    public void sendReservationReminders() {
        List<Reservation> reservations = reservationRepository.findAll();
        for (Reservation reservation : reservations) {
            ReservationDto reservationDto = convertToDto(reservation);
            String userEmail = reservation.getMember().getEmail();
            if (reservationDto.getStart().isAfter(LocalDateTime.now().plusHours(1))) {
                emailService.sendReservationReminder(userEmail, reservationDto);
            }
        }
    }

}
