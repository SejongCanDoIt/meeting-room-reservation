package sejong.reserve.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Reservation;
import sejong.reserve.dto.ReservationDto;
import sejong.reserve.repository.ReservationRepository;

import java.time.LocalDateTime;
import java.util.List;



@RequiredArgsConstructor
@Service
public class EmailReminderService {

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
    @Transactional
    @Scheduled(cron = "0 * * * * *")// 이 스케줄링은 매 분마다 이 작업이 일생된다는 뜻입니다.
    public void sendReservationReminders() {

        // 현재 시간을 가지고 옵니다.
        LocalDateTime now = LocalDateTime.now();

        // 현재시간으로부터 1시간뒤를 계산합니다.
        LocalDateTime oneHourAhead= now.plusHours(1);
        // 현재시간보다 1시간 뒤의 예약들을 가직고 옵니다.
        List<Reservation> reservations = reservationRepository.findByStartTimeBetween(now, oneHourAhead);
        // 이메일
        for (Reservation reservation : reservations) {
            String email = reservation.getMember().getEmail();
            String subject = "예약 시작 1시간 전 입니다.";
            String text = "예약 시작 시간: " + reservation.getStart()+ "\n" + "장소: " + reservation.getRoom().getName() +"\n"
                    +"타인을 위해 늦지않게 와주시길 바랍니다.";
            emailService.sendSimpleMessage(email, subject, text);

            // 한 번 보내진 예약에 대해서 다시 메일이 가지않게 막습니다.
            reservationRepository.setReminderSent(reservation.getId());
        }
    }

}
