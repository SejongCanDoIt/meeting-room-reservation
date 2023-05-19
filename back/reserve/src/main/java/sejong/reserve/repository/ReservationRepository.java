package sejong.reserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Reservation;
import sejong.reserve.domain.ReservationStatus;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // 전체 예약을 최신순으로 반환 (예약중, 완료, 삭제 포함)
    @Query("select r from Reservation r where r.member.studentNo = :studentNo order by r.start DESC ")
    List<Reservation> findByStudentNo(@Param("studentNo") String studentNo);

    // 상태에 따라 예약 리스트를 최신순으로 반환
    @Query("select r from Reservation r where r.member.studentNo = :studentNo and r.status = :status order by r.start DESC ")
    List<Reservation> findByStudentNoAndStatus(@Param("studentNo") String studentNo, @Param("status") ReservationStatus status);


    // 해당 예약의 시작 시간 반환
    @Query("select r.start from Reservation r where r.id = :id")
    LocalDateTime getStartTime(@Param("id") Long reservation_id);

    // 해당 예약의 끝 시간 반환
    @Query("select r.end from Reservation r where r.id = :id")
    LocalDateTime getEndTime(@Param("id") Long reservation_id);


    @Query("select count(r) from Reservation r where r.start < :end and r.end > :start and r.status = 'RESERVED'" +
            " and r.room.id = :roomId")
    int isPossibleTime(@Param("start")LocalDateTime start, @Param("end")LocalDateTime end, @Param("roomId")Long roomId);



    @Query("select r from Reservation r where r.member.studentNo =:studentNo and r.status =:status")
    List<Reservation> getStatusList(@Param("studentNo") String studentNo, @Param("status") ReservationStatus status);

    @Query("select r from Reservation r where r.start >= :todayStart and r.end <= :todayEnd and r.room.id =:roomId")
    List<Reservation> getTodayTimeList(@Param("todayStart")LocalDateTime todayStart,
                                       @Param("todayEnd")LocalDateTime todayEnd,
                                       @Param("roomId")Long roomId);

    @Query("select count(r) from Reservation r where r.start >= :todayStart and r.end <= :todayEnd and r.room.id = :roomId")
   int getTodayReserveCnt(@Param("todayStart")LocalDateTime todayStart,
                          @Param("todayEnd")LocalDateTime todayEnd,
                          @Param("roomId")Long roomId);

    @Query("select r from Reservation r where r.member.studentNo = :studentNo order by r.start DESC ")
    List<Reservation> getReservationListBySno(@Param("studentNo") String studentNo);

    @Query("select r from Reservation r where :dateStart <= r.start and r.end < :dateEnd order by r.start DESC ")
    List<Reservation> getReservationListByDate(@Param("dateStart") LocalDateTime dateStart, @Param("dateEnd") LocalDateTime dateEnd);

    @Query("select r from Reservation r where :dateStart <= r.start and r.end < :dateEnd and r.status = :status order by r.start DESC ")
    List<Reservation> getReservationListByDateAndStatus(@Param("dateStart") LocalDateTime dateStart, @Param("dateEnd") LocalDateTime dateEnd, @Param("status") ReservationStatus status);


    @Query("select r from Reservation r where r.member.studentNo = :studentNo and r.status = :status")
    List<Reservation> getReservationListBySnoAndStatus(@Param("studentNo") String studentNo, @Param("status") ReservationStatus status);

    @Query("select r from Reservation r where r.start >= :start and r.end <= :end and r.reminderSent = false")
    List<Reservation> findByStartTimeBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    @Modifying
    @Query("update Reservation r set r.reminderSent = true where r.id = :id")
    void setReminderSent(@Param("id") Long id);
}
