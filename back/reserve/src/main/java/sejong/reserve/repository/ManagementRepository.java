package sejong.reserve.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Management;
import sejong.reserve.domain.Room;
import sejong.reserve.service.ManagementService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
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
        return (int) em.createQuery("select m.univ_cnt from Management m").getSingleResult();
    }

    public int getPostCnt() {
        return (int) em.createQuery("select m.post_cnt from Management m").getSingleResult();
    }

    public int getOfficeCnt() {
        return (int) em.createQuery("select m.office_cnt from Management m").getSingleResult();
    }
    public int getProCnt() {
        return (int) em.createQuery("select m.pro_cnt from Management m").getSingleResult();
    }


    public int getUnivTimeGap() {
        return (int) em.createQuery("select m.univ_time_gap from Management m").getSingleResult();
    }
    public int getPostTimeGap() {
        return (int) em.createQuery("select m.post_time_gap from Management m").getSingleResult();
    }

    public int getOfficeTimeGap() {
        return (int) em.createQuery("select m.office_time_gap from Management m").getSingleResult();
    }
    public int getProTimeGap() {
        return (int) em.createQuery("select m.pro_time_gap from Management m").getSingleResult();
    }

    public int getUnivRegularGap() {
        return (int) em.createQuery("select m.univ_regular_gap from Management m").getSingleResult();
    }
    public int getPostRegularGap() {
        return (int) em.createQuery("select m.post_regular_gap from Management m").getSingleResult();
    }

    public int getOfficeRegularGap() {
        return (int) em.createQuery("select m.office_regular_gap from Management m").getSingleResult();
    }
    public int getProRegularGap() {
        return (int) em.createQuery("select m.pro_regular_gap from Management m").getSingleResult();
    }

}
