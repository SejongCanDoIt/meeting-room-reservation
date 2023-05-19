package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@ToString
public class ManagementDto {
    private int univ_cnt; // 대학생
    private int post_cnt; // 대학원생
    private int office_cnt; // 사무실
    private int pro_cnt; // 교수

    // 예약 시간 간격 간격 기준: 시간
    private int univ_hour_gap; // 대학생
    private int post_hour_gap; // 대학원생
    private int office_hour_gap; // 사무실
    private int pro_hour_gap; // 교수

    // 예약 시간 간격 간격 기준: 일
    private int univ_day_gap; // 대학생
    private int post_day_gap; // 대학원생
    private int office_day_gap; // 사무실
    private int pro_day_gap; // 교수

    // 예약 가능 시간 간격 기준: 주
    private int univ_week_gap; // 대학생
    private int post_week_gap; // 대학원생
    private int office_week_gap; // 사무실
    private int pro_week_gap; // 교수

    public ManagementDto() {
    }

    public ManagementDto(int univ_cnt, int post_cnt, int office_cnt, int pro_cnt, int univ_hour_gap, int post_hour_gap, int office_hour_gap, int pro_hour_gap, int univ_day_gap, int post_day_gap, int office_day_gap, int pro_day_gap, int univ_week_gap, int post_week_gap, int office_week_gap, int pro_week_gap) {
        this.univ_cnt = univ_cnt;
        this.post_cnt = post_cnt;
        this.office_cnt = office_cnt;
        this.pro_cnt = pro_cnt;
        this.univ_hour_gap = univ_hour_gap;
        this.post_hour_gap = post_hour_gap;
        this.office_hour_gap = office_hour_gap;
        this.pro_hour_gap = pro_hour_gap;
        this.univ_day_gap = univ_day_gap;
        this.post_day_gap = post_day_gap;
        this.office_day_gap = office_day_gap;
        this.pro_day_gap = pro_day_gap;
        this.univ_week_gap = univ_week_gap;
        this.post_week_gap = post_week_gap;
        this.office_week_gap = office_week_gap;
        this.pro_week_gap = pro_week_gap;
    }
}
