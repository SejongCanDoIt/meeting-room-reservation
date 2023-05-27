package sejong.reserve.dto;

import lombok.Data;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.AuthState;

@Data
public class UpdateAdminDto {

    private String phoneNo; // 전화번호
    private String email; // email
    private String password; // password


    public UpdateAdminDto() {
    }

    public UpdateAdminDto(Admin admin) {
        this.phoneNo = admin.getPhoneNo();
        this.email = admin.getEmail();
        this.password = admin.getPassword();
    }
}
