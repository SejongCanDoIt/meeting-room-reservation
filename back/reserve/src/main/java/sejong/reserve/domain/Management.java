package sejong.reserve.domain;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
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
    @ColumnDefault("3")
    private int univ_cnt; // 대학생
    @ColumnDefault("5")
    private int post_cnt; // 대학원생
    @ColumnDefault("10")
    private int office_cnt; // 사무실
    @ColumnDefault("10")
    private int pro_cnt; // 교수

    // 예약 시간 간격 간격 기준: 시간
    @ColumnDefault("2")
    private int univ_hour_gap; // 대학생
    @ColumnDefault("3")
    private int post_hour_gap; // 대학원생
    @ColumnDefault("6")
    private int office_hour_gap; // 사무실
    @ColumnDefault("6")
    private int pro_hour_gap; // 교수

    // 예약 시간 간격 간격 기준: 일
    @ColumnDefault("2")
    private int univ_day_gap; // 대학생
    @ColumnDefault("7")
    private int post_day_gap; // 대학원생
    @ColumnDefault("365")
    private int office_day_gap; // 사무실
    @ColumnDefault("365")
    private int pro_day_gap; // 교수

    // 예약 가능 시간 간격 기준: 주
    @ColumnDefault("1")
    private int univ_week_gap; // 대학생
    @ColumnDefault("2")
    private int post_week_gap; // 대학원생
    @ColumnDefault("12") // (3 month)
    private int office_week_gap; // 사무실
    @ColumnDefault("12") // (3 month)
    private int pro_week_gap; // 교수

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
        management.setUniv_hour_gap(managementInfo.getUniv_hour_gap());
        management.setPost_hour_gap(managementInfo.getPost_hour_gap());
        management.setOffice_hour_gap(managementInfo.getOffice_hour_gap());
        management.setPro_hour_gap(managementInfo.getPro_hour_gap());
        management.setUniv_week_gap(managementInfo.getUniv_week_gap());
        management.setPost_week_gap(managementInfo.getPost_week_gap());
        management.setOffice_week_gap(managementInfo.getOffice_week_gap());
        management.setPro_week_gap(managementInfo.getPro_week_gap());
    }
}
