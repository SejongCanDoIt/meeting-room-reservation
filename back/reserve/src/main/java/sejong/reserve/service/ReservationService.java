package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.*;
import sejong.reserve.repository.MemberRepository;
import sejong.reserve.repository.ReservationRepository;
import sejong.reserve.repository.RoomRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final ReservationRepository reservationRepository;


    @Transactional
    public Long makeReservation(Reservation reservation) {
        Reservation savedReservation = reservationRepository.save(reservation);
        return savedReservation.getId();
    }


    // 전체 예약 리스트
    public List<Reservation> managerList() {
        return reservationRepository.findAll();
    }

    // 학생별 예약 리스트
    public List<Reservation> userList(String student_no) {
        return reservationRepository.findByStudentNo(student_no);
    }

    // 예약 id 를 통한 예약 정보
    public Optional<Reservation> getReservation(Long reservation_id) {
        Optional<Reservation> reservation = reservationRepository.findById(reservation_id);
        return reservation;
    }

    public Boolean isPossibleTime(LocalDateTime start, LocalDateTime end) {
        ZoneId localZone = ZoneId.systemDefault();
        log.info("localZone = {}", localZone);
        int timeCnt = reservationRepository.isPossibleTime(start, end);
        if(timeCnt == 0) {
            return true;
        } else {
            return false;
        }
    }

    public LocalDateTime getStartTime(Long reservation_id) {
        return reservationRepository.getStartTime(reservation_id);
    }

    public LocalDateTime getEndTime(Long reservation_id) {
        return reservationRepository.getEndTime(reservation_id);
    }

    @Transactional
    public void setStatus(ReservationStatus status, Long reservation_id) {
        reservationRepository.setStatus(status, reservation_id);
    }

    @Transactional
    public void deleteOne(Long reservation_id) {
        reservationRepository.deleteById(reservation_id);
    }

    @Transactional
    public void deleteAll(String student_no) {
        List<Reservation> reservations = reservationRepository.findByStudentNo(student_no);
        reservationRepository.deleteAll(reservations);
    }

    @Transactional
    public void reset() {
        reservationRepository.deleteAll();
    }

    public List<Reservation> getStatusList(String student_no, ReservationStatus status) {
        return reservationRepository.getStatusList(student_no, status);
    }
}
