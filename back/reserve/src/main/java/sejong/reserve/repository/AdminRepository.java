package sejong.reserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Notice;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {



}
