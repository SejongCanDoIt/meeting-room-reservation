package sejong.reserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Notice;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query(value = "select m from Member m where m.noshow >= :noShow")
    List<Member> findMemberByNoShow(@Param("noShow") int noShow);

}
