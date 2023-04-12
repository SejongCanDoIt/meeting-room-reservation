package sejong.reserve.repository;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Reservation;
import sejong.reserve.domain.ReservationStatus;
import sejong.reserve.domain.Time;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("select r from Reservation r where r.member.studentNo = :studentNo")
    List<Reservation> findByStudentNo(@Param("studentNo") String studentNo);


    // 해당 예약의 시작 시간 반환
    @Query("select r.start from Reservation r where r.id = :id")
    LocalDateTime getStartTime(@Param("id") Long reservation_id);

    // 해당 예약의 끝 시간 반환
    @Query("select r.end from Reservation r where r.id = :id")
    LocalDateTime getEndTime(@Param("id") Long reservation_id);


    @Query("select count(r) from Reservation r where r.start >= :start and r.end <= :end and r.status = 'RESERVED'")
    int isPossibleTime(@Param("start")LocalDateTime start, @Param("end")LocalDateTime end);


    @Query("select r from Reservation r where r.member.studentNo =:studentNo and r.status =:status")
    List<Reservation> getStatusList(@Param("studentNo") String studentNo, @Param("status") ReservationStatus status);

    @Query("select r from Reservation r where r.start >= :todayStart and r.end <= :todayEnd")
    List<Reservation> getTodayTimeList(@Param("todayStart")LocalDateTime todayStart, @Param("todayEnd")LocalDateTime todayEnd);
}