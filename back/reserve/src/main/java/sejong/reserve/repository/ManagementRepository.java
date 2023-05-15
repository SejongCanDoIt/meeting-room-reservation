package sejong.reserve.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Management;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ManagementRepository {
    private final EntityManager em;

    public Management findOne() {
        List<Management> managements =
                em.createQuery("select m from Management m", Management.class)
                .getResultList();
        log.info(String.valueOf(managements.get(0)));
        return managements.get(0);
    }

    public int getUnivCnt() {
        return (int) em.createQuery("select m.univ_cnt from Management m").getResultList().get(0);
    }

    public int getPostCnt() {
        return (int) em.createQuery("select m.post_cnt from Management m").getResultList().get(0);
    }

    public int getOfficeCnt() {
        return (int) em.createQuery("select m.office_cnt from Management m").getResultList().get(0);
    }
    public int getProCnt() {
        return (int) em.createQuery("select m.pro_cnt from Management m").getResultList().get(0);
    }


    public int getUnivHourGap() {
        return (int) em.createQuery("select m.univ_hour_gap from Management m").getResultList().get(0);
    }
    public int getPostHourGap() {
        return (int) em.createQuery("select m.post_hour_gap from Management m").getResultList().get(0);
    }

    public int getOfficeHourGap() {
        return (int) em.createQuery("select m.office_hour_gap from Management m").getResultList().get(0);
    }
    public int getProHourGap() {
        return (int) em.createQuery("select m.pro_hour_gap from Management m").getResultList().get(0);
    }

    public int getUnivDayGap() {
        return (int) em.createQuery("select m.univ_day_gap from Management m").getResultList().get(0);
    }
    public int getPostDayGap() {
        return (int) em.createQuery("select m.post_day_gap from Management m").getResultList().get(0);
    }

    public int getOfficeDayGap() {
        return (int) em.createQuery("select m.office_day_gap from Management m").getResultList().get(0);
    }
    public int getProDayGap() {
        return (int) em.createQuery("select m.pro_day_gap from Management m").getResultList().get(0);
    }

    public int getUnivWeekGap() {
        return (int) em.createQuery("select m.univ_week_gap from Management m").getResultList().get(0);
    }
    public int getPostWeekGap() {
        return (int) em.createQuery("select m.post_week_gap from Management m").getResultList().get(0);
    }

    public int getOfficeWeekGap() {
        return (int) em.createQuery("select m.office_week_gap from Management m").getResultList().get(0);
    }
    public int getProWeekGap() {
        return (int) em.createQuery("select m.pro_week_gap from Management m").getResultList().get(0);
    }

}
