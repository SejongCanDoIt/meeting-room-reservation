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

//    public void update(Management managementInfo) throws PersistenceException {
//        Management management = em.find(Management.class, managementInfo.getId());
//        management.setManagement(managementInfo, management);
//    }

//    public void updateCnt(int univ_cnt, int post_cnt, int pro_cnt) throws PersistenceException {
//        Management management =
//                em.createQuery("select m from Management m", Management.class)
//                        .getResultList().get(0);
//        management.setUniv_cnt(univ_cnt);
//        management.setPost_cnt(post_cnt);
//        management.setPro_cnt(pro_cnt);
//    }

//    public void updateGap(int univ_gap, int post_gap, int pro_gap) throws PersistenceException {
//        Management management =
//                em.createQuery("select m from Management m", Management.class)
//                        .getResultList().get(0);
//        management.setUniv_gap(univ_gap);
//        management.setPost_gap(post_gap);
//        management.setPro_gap(pro_gap);
//    }

    public int getUnivCnt() {
        return (int) em.createQuery("select m.univ_cnt from Management m").getSingleResult();
    }

    public int getPostCnt() {
        return (int) em.createQuery("select m.post_cnt from Management m").getSingleResult();
    }

    public int getProCnt() {
        return (int) em.createQuery("select m.pro_cnt from Management m").getSingleResult();
    }

    public int getUnivGap() {
        return (int) em.createQuery("select m.univ_gap from Management m").getSingleResult();
    }
    public int getPostGap() {
        return (int) em.createQuery("select m.post_gap from Management m").getSingleResult();
    }
    public int getProGap() {
        return (int) em.createQuery("select m.pro_gap from Management m").getSingleResult();
    }

}
