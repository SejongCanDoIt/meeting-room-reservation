package sejong.reserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Notice;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query("select m from Admin m")
    Optional<Admin> findByAdminId(String studentNo);

}
