package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.*;
import sejong.reserve.dto.ReservationDto;
import sejong.reserve.dto.TimeDto;
import sejong.reserve.service.ManagementService;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;
import sejong.reserve.service.RoomService;
import sejong.reserve.web.argumentresolver.Login;
import sejong.reserve.web.exception.AlreadyReservedException;
import sejong.reserve.web.exception.AuthorityException;
import sejong.reserve.web.exception.NotLoginException;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/reserve/")
public class ReservationController {
    private final ReservationService reservationService;
    private final ManagementService managementService;
    private final RoomService roomService;
    private final MemberService memberService;

    @PostMapping
    public Long makeReservation(@RequestBody ReservationDto reservationDto,
                                @RequestParam Long room_id,
                                @Login Member loginMember,
                                HttpSession session) {
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }
        log.info("loginMember = {}", loginMember);
        loginMember.removeCnt();

        LocalDateTime start = reservationDto.getStart();
        LocalDateTime end = reservationDto.getEnd();
        // 예약할 날짜를 보내줬을 때 원래 있던 예약과 겹치는지?
        if(!reservationService.isPossibleTime(start, end)) {
            throw new AlreadyReservedException("이미 다른 예약이 되어있는 시간입니다. 다른 시간대를 선택해주십시오.");
        }

        // 예약 시간 gap이 권한에 적합한지?
        int gap = end.getHour() - start.getHour();
        AuthState authority = loginMember.getAuthority();
        checkGap(gap, authority);

        // 예약 저장
        Room room = roomService.detail(room_id);
        log.info("room = {}", room);
        Reservation reservation = Reservation.createReservation(reservationDto, loginMember, room);
        log.info("reservation = {}", reservation);
        reservationService.makeReservation(reservation);

        return reservation.getId();
    }

    private void checkGap(int gap, AuthState authority) {
        int authGap = 0;
        switch (authority) {
            case UNI_STUDENT:
                authGap = managementService.getUnivGap();
                break;
            case POST_STUDENT:
                authGap = managementService.getPostGap();
                break;
            case PROFESSOR: case OFFICE:
                authGap = managementService.getProGap();
                break;
        }
        if(authGap < gap) {
            throw new AuthorityException("권한에 부여된 시간보다 넘게 신청하셨습니다. 시간을 조절해주시길 바랍니다.");
        }
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
    public ResponseEntity<List<Reservation>> userList(HttpSession session,
                                                      @Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
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
    public void deleteAll(HttpSession session, @Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
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

    @GetMapping("time-list")
    public List<TimeDto> timeList(@RequestParam("todayDate") LocalDateTime todayDate) {
        return reservationService.getTodayTimeList(todayDate);
    }



    @GetMapping("today-time-check")
    public int[] getTodayTimeCheck(@RequestParam("year") int year,
                                   @RequestParam("month") int month,
                                   @RequestParam("day") int day) {
        LocalDateTime todayDate = LocalDateTime.of(year, month, day, 0, 0);
        return reservationService.getTodayTimeCheck(todayDate);
    }

    @GetMapping("month-reserve-check")
    public List<Integer> getMonthReserveCheck(@RequestParam("year") int year,
                                   @RequestParam("month") int month) {
        return reservationService.getMonthReserveCheck(year, Month.of(month));
    }


}
