package sejong.reserve.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findByName(String name);


    @Query("select m from Member m where m.studentNo = :studentNo")
    Optional<Member> findByMemberIdOp(String studentNo);

    @Query("select m from Member m where m.studentNo = :studentNo")
    Member findByStudentNo(@Param("studentNo") String studentNo);

    @Query("delete from Member m where m.studentNo = :studentNo")
    void deleteByStudentNo(@Param("studentNo") String studentNo);

    @Query("select substring(m.phoneNo, length(m.phoneNo) - 3) from Member m where m.studentNo = :studentNo")
    String findPhoneNoByStudentNo(@Param("studentNo") String studentNo);

    @Query("select  m.authority from Member m where m.studentNo = :studentNo")
    String getAuthState(@Param("studentNo") String studentNo);

    @Query(value = "select m from Member m where m.studentNo =:studentNo and m.password = :password")
    Member findMemberForLogin(@Param("studentNo") String studentNo, @Param("password") String password);

    @Query(value = "select m from Member m where m.studentNo like %:q% or m.name like %:q%")
    List<Member> findMemberBySnoOrName(@Param("q") String q);

    @Query(value = "select m from Member m where m.noshow >= :noShow")
    List<Member> findMemberByNoShow(@Param("noShow") int noShow);

    @Query(value = "select m from Member m where m.authority >= :authority")
    List<Member> findMemberByAuthState(@Param("authority")AuthState authority);

    @Query(value = "select sum(m.noshow) from Member m where m.authority >= :authority")
    Integer sumOfNoShowCntByAuthState(@Param("authority")AuthState authority);
    @Query(value = "select sum(m.noshow) from Member m")
    Integer sumOfNoShowCntAll();

}
