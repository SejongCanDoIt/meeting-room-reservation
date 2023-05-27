/*
package sejong.reserve;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sejong.reserve.controller.ReservationController;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Reservation;
import sejong.reserve.service.EmailService;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@SpringBootTest
public class EmailTest {

    @Autowired
    private ReservationController reservationController;

    @MockBean
    private EmailService emailService;

    @MockBean
    private ReservationService reservationService;

    @MockBean
    private MemberService memberService;

    @Test
    public void testSendRegularEmail() {
        Member loginMember = new Member();
        loginMember.setEmail("wxyz0904@naver.com");
        loginMember.setName("Test User");

        Reservation reservation = new Reservation();
        reservation.setStart(LocalDateTime.now());
        reservation.setEnd(LocalDateTime.now().plusDays(7));

        Mockito.when(memberService.getLoginMember()).thenReturn(loginMember);
        Mockito.when(reservationService.getReservation(any(Long.class))).thenReturn(Optional.of(reservation));

        emailController.sendRegularEmail(loginMember, 1L, "weekly", 3);

        verify(emailService).sendSimpleMessage(
                eq("wxyz0904@naver.com"),
                eq("Test User님의 정기예약이 완료되었습니다."),
                any(String.class)
        );
    }
}
*/
