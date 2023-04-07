package sejong.reserve.domain;

import lombok.Data;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.RoomRepository;

import javax.persistence.*;

@Entity
@Data
@Table(name = "MANAGEMENT")
public class Management {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 예약 가능 횟수
    private int univ_cnt; // 대학생
    private int post_cnt; // 대학원생
    private int pro_cnt; // 교수

    // 예약 시간 간격
    private int univ_gap; // 대학생
    private int post_gap; // 대학원생
    private int pro_gap; // 교수

    //==생성 메서드==//
    public static Management createManagement(Management managementInfo) {
        Management management = new Management();

        setManagement(managementInfo, management);

        return management;
    }

    public static void setManagement(Management managementInfo, Management management) {
        management.setUniv_cnt(managementInfo.getUniv_cnt());
        management.setPost_cnt(managementInfo.getPost_cnt());
        management.setPro_cnt(managementInfo.getPro_cnt());
        management.setUniv_gap(managementInfo.getUniv_gap());
        management.setPost_gap(managementInfo.getPost_gap());
        management.setPro_gap(managementInfo.getPro_gap());
    }
}
