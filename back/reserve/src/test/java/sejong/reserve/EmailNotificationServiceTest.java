package sejong.reserve;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;
import sejong.reserve.service.EmailReminderService;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
public class EmailNotificationServiceTest {
    @Autowired
    EmailReminderService emailNotificationService;

    @MockBean
    JavaMailSender javaMailSender;

    @Test
    public void testSendReservationReminders() {
        MockMailSender mockMailSender = new MockMailSender();
        // 서비스가 MockMailSender를 사용하도록 설정
        ReflectionTestUtils.setField(emailNotificationService, "javaMailSender", mockMailSender);

        // 예약 알림 메일 보내기 메소드 호출
        emailNotificationService.sendReservationReminders();

        // 가짜 메일 서비스가 올바르게 호출되었는지 확인
        // 실제 확인할 메일 주소로 수정해야 합니다.
        assertEquals(1, mockMailSender.getRequests().size());
        assertEquals("test@example.com", mockMailSender.getRequests().get(0));
    }


}
