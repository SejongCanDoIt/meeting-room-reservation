package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.*;
import sejong.reserve.repository.ReservationRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
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
        Optional<Reservation> reservation = reservationRepository.findById(reservation_id);
        Reservation reservationReal = reservation.get();
        reservationReal.setStatus(status);
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

    @Transactional
    public void cancel(Long reservation_id) {
        Optional<Reservation> reservation = reservationRepository.findById(reservation_id);
        Reservation reservationReal = reservation.get();
        reservationReal.setStart(null);
        reservationReal.setEnd(null);
    }

    public List<Time> getTodayTimeList(LocalDateTime todayDate) {
        int year = todayDate.getYear();
        Month month = todayDate.getMonth();
        int day = todayDate.getDayOfMonth();
        LocalDateTime todayStart = LocalDateTime.of(year, month, day, 0, 0);
        LocalDateTime todayEnd = LocalDateTime.of(year, month, day, 23, 59);

        List<Reservation> reservations = reservationRepository.getTodayTimeList(todayStart, todayEnd);
        List<Time> timeList = new ArrayList<>();
        for(Reservation reservation:reservations) {
            LocalDateTime start = reservation.getStart();
            LocalDateTime end = reservation.getEnd();
            Time time = new Time(start, end);
            timeList.add(time);
        }
        return timeList;
    }
}
