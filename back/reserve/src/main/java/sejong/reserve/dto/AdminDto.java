package sejong.reserve.dto;

import lombok.Data;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.AuthState;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class AdminDto {

    private String loginId; // login id

    private String phoneNo; // 전화번호

    private String email; // email

    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE

    public AdminDto() {
    }

    public AdminDto(Admin admin) {
        this.loginId = admin.getLoginId();
        this.phoneNo = admin.getPhoneNo();
        this.email = admin.getEmail();
        this.authority = AuthState.ADMIN;
    }
}
