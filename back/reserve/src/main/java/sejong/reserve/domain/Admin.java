package sejong.reserve.domain;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.dto.CreateRequestNoticeDto;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "admin")
public class Admin {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id; // admin primary id

    @Column(name = "login_id")
    private String loginId; // login id

    @Column(name = "phn")
    private String phoneNo; // 전화번호

    @Column(name="email")
    private String email; // email

    @Column(name = "pwd")
    private String password;

    @Column(name = "auth")
    @Enumerated(EnumType.STRING)
    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE

}
