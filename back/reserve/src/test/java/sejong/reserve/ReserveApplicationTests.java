/*
package sejong.reserve;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Reservation;
import sejong.reserve.dto.ReservationDto;
import sejong.reserve.service.EmailService;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class ReserveApplicationTests {

	@InjectMocks
	private EmailService emailService;

	@Mock
	private JavaMailSender mailSender;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void sendReservationReminderTest() {
		Member member = new Member();
		member.setEmail("test@example.com");

		ReservationDto reservationDto = new ReservationDto();
		reservationDto.setStart(LocalDateTime.of(2023, 5, 19, 15, 0, 0));
		reservationDto.setEnd(LocalDateTime.of(2023, 5, 19, 18, 0, 0));

		Reservation reservation = new Reservation();
		reservation.setMember(member);
		reservation.setStart(reservationDto.getStart());
		reservation.setEnd(reservationDto.getEnd());

		emailService.sendReservationReminder(reservation.getMember().getEmail(), reservationDto);

		verify(mailSender, times(1)).send(any(SimpleMailMessage.class));
	}
}
*/
