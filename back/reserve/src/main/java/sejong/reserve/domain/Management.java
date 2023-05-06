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
    private int office_cnt; // 교수
    private int pro_cnt; // 교수

    // 예약 시간 간격
    private int univ_time_gap; // 대학생
    private int post_time_gap; // 대학원생
    private int office_time_gap; // 대학원생
    private int pro_time_gap; // 교수

    // 정기예약 가능 시간 간격 기준: 월
    private int univ_regular_gap; // 대학생
    private int post_regular_gap; // 대학원생
    private int office_regular_gap; // 대학원생
    private int pro_regular_gap; // 교수

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
        management.setUniv_time_gap(managementInfo.getUniv_time_gap());
        management.setPost_time_gap(managementInfo.getPost_time_gap());
        management.setOffice_time_gap(managementInfo.getOffice_time_gap());
        management.setPro_time_gap(managementInfo.getPro_time_gap());
        management.setUniv_regular_gap(managementInfo.getUniv_regular_gap());
        management.setPost_regular_gap(managementInfo.getPost_regular_gap());
        management.setOffice_regular_gap(managementInfo.getOffice_regular_gap());
        management.setPro_regular_gap(managementInfo.getPro_regular_gap());
    }
}
