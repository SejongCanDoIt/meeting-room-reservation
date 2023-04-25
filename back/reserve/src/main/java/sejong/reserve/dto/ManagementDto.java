package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sejong.reserve.domain.Management;
import sejong.reserve.domain.Room;

@Getter
@Setter
@ToString
public class ManagementDto {
    private Long id;
    // 예약 가능 횟수
    private int univ_cnt; // 대학생
    private int post_cnt; // 대학원생
    private int pro_cnt; // 교수

    // 예약 시간 간격
    private int univ_gap; // 대학생
    private int post_gap; // 대학원생
    private int pro_gap; // 교수

    public ManagementDto(Management managementInfo) {
        this.id = managementInfo.getId();
        this.univ_cnt = managementInfo.getUniv_cnt();
        this.post_cnt = managementInfo.getPost_cnt();
        this.pro_cnt = managementInfo.getPro_cnt();
        this.univ_gap = managementInfo.getUniv_gap();
        this.post_gap = managementInfo.getPost_gap();
        this.pro_gap = managementInfo.getPro_gap();
    }

}
