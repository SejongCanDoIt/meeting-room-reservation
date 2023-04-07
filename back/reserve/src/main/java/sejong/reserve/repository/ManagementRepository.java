package sejong.reserve.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Management;
import sejong.reserve.domain.Room;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ManagementRepository implements Repo<Management> {
    private final EntityManager em;

    @Override
    public void save(Management management) {
        em.persist(management);
    }

    @Override
    public Management findById(Long id) {
        return em.find(Management.class, id);
    }

    @Override
    public List<Management> findAll() {
        return em.createQuery("select m from Room m", Management.class)
                .getResultList();
    }

    @Override
    public void delete(Long id) throws PersistenceException {
        Management management = findById(id);
        em.remove(management);
    }

    @Override
    public void update(Management managementInfo) throws PersistenceException {
        Management management = em.find(Management.class, managementInfo.getId());
        management.setManagement(managementInfo, management);
    }

    public void updateCnt(Long management_id, int univ_cnt, int post_cnt, int pro_cnt) throws PersistenceException {
        Management management = em.find(Management.class, management_id);
        management.setUniv_cnt(univ_cnt);
        management.setPost_cnt(post_cnt);
        management.setPro_cnt(pro_cnt);
    }

    public void updateGap(Long management_id, int univ_gap, int post_gap, int pro_gap) throws PersistenceException {
        Management management = em.find(Management.class, management_id);
        management.setUniv_gap(univ_gap);
        management.setPost_gap(post_gap);
        management.setPro_gap(pro_gap);
    }

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
