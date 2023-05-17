package sejong.reserve.service;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Reservation;
import sejong.reserve.dto.ReservationDto;


@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender mailSender;


    @Transactional
    public void sendReservationReminder(String recipientEmail, ReservationDto reservation){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("your-email@example.com"); // 여기에 발신 이메일 주소를 넣으세요
        message.setTo(recipientEmail);
        message.setSubject("Reservation Reminder");
        message.setText("You have a reservation at " + reservation.getReservationTime());
        mailSender.send(message);
    }



}
