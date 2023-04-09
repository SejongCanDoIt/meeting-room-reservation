package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.*;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;
import sejong.reserve.service.RoomService;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/reserve/")
public class ReservationController {
    private final ReservationService reservationService;
    private final RoomService roomService;

    @GetMapping("")
    public Long makeReservation(@RequestBody ReservationInfo reservationInfo,
                                @RequestParam Long room_id,
                                HttpSession session) {
        Member loginMember = (Member) session.getAttribute("loginMember");
        log.info("loginMember = {}", loginMember);

        if(loginMember == null) {
            throw new IllegalStateException("로그인이 안되어 있는 상태입니다.");
        }

        loginMember.removeCnt();

        Room room = roomService.detail(room_id);

        LocalDateTime start = reservationInfo.getStart();
        LocalDateTime end = reservationInfo.getEnd();
        // 예약할 날짜를 보내줬을 때 원래 있던 예약과 겹치는지?
        if(!reservationService.isPossibleTime(start, end)) {
            throw new IllegalStateException("이미 다른 예약이 되어있는 시간입니다. 다른 시간대를 선택해주십시오.");
        }

        Reservation reservation = Reservation.createReservation(reservationInfo, loginMember, room);

        log.info("reservation = {}", reservation);

        reservationService.makeReservation(reservation);

        return reservation.getId();
    }

    @GetMapping("time-check")
    public Boolean timeCheck(@RequestParam LocalDateTime start,
                             @RequestParam LocalDateTime end) {
        return reservationService.isPossibleTime(start, end);
    }



    @GetMapping("get")
    public ResponseEntity<Optional<Reservation>> getReservation(@RequestParam Long reservation_id) {
        Optional<Reservation> reservation = reservationService.getReservation(reservation_id);
        if (!reservation.isEmpty()) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("manager-list")
    public ResponseEntity<List<Reservation>> managerList() {
        List<Reservation> reservations = reservationService.managerList();
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("user-list")
    public ResponseEntity<List<Reservation>> userList(HttpSession session) {
        Member loginMember = (Member) session.getAttribute("loginMember");
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new IllegalStateException("로그인이 안되어 있는 상태입니다.");
        }

        List<Reservation> reservations =
                reservationService.userList(loginMember.getStudentNo());

        log.info("sno = {}", loginMember.getStudentNo());
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("delete-one")
    public void deleteOne(@RequestParam("reservation_id") Long reservation_id) {
        reservationService.deleteOne(reservation_id);
    }

    @DeleteMapping("delete-all")
    public void deleteAll(@RequestParam("sno") String student_no) {
        reservationService.deleteAll(student_no);
    }

    @DeleteMapping("login-delete-all")
    public void deleteAll(HttpSession session) {
        Member loginMember = (Member) session.getAttribute("loginMember");
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new IllegalStateException("로그인이 안되어 있는 상태입니다.");
        }
        reservationService.deleteAll(loginMember.getStudentNo());
    }

    @PostMapping("reset")
    public void deleteAll() {
        reservationService.reset();
    }


    @PutMapping("set-status-reserved")
    public void updateStatusReserved(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.RESERVED, reservation_id);
    }

    @PutMapping("set-status-finished")
    public void updateStatusFinished(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.FINISHED, reservation_id);
    }

    @PutMapping("set-status-canceled")
    public void updateStatusCanceled(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.CANCELED, reservation_id);
        reservationService.cancel(reservation_id);
    }

    /**
     * 예약 상태에 따른 예약 내역 가져오기
     */
    // 취소
    @GetMapping("canceled-list")
    public List<Reservation> canceledList(@RequestParam("sno") String student_no) {
        return reservationService.getStatusList(student_no, ReservationStatus.CANCELED);
    }

    // 대기(예약 된 상태)
    @GetMapping("reserved-list")
    public List<Reservation> reservedList(@RequestParam("sno") String student_no) {
        return reservationService.getStatusList(student_no, ReservationStatus.RESERVED);
    }

    // 끝남
    @GetMapping("finished-list")
    public List<Reservation> finishedList(@RequestParam("sno") String student_no) {
        return reservationService.getStatusList(student_no, ReservationStatus.FINISHED);
    }


}
