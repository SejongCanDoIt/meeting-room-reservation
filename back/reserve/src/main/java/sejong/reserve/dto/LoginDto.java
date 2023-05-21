package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDto {
    private String sno; // 학번 (Login-ID)
    private String password;
}
