package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.*;
import sejong.reserve.dto.ReservationDto;
import sejong.reserve.dto.ReservationsDto;
import sejong.reserve.dto.TimeDto;
import sejong.reserve.service.ManagementService;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;
import sejong.reserve.service.RoomService;
import sejong.reserve.web.argumentresolver.Login;
import sejong.reserve.web.exception.AlreadyReservedException;
import sejong.reserve.web.exception.AuthorityException;
import sejong.reserve.web.exception.NotAvailableReservedException;
import sejong.reserve.web.exception.NotLoginException;

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
    public ResponseEntity<Long> makeReservation(@RequestBody ReservationDto reservationDto,
                                @RequestParam Long room_id,
                                @Login Member loginMember) {
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }
        log.info("loginMember = {}", loginMember);



        LocalDateTime start = reservationDto.getStart();
        LocalDateTime end = reservationDto.getEnd();
        AuthState authority = loginMember.getAuthority();
        Boolean regular = reservationDto.getRegular();

        // 정기 및 일반 예약에 대한 달이 적합한지?
        checkNormalAndRegularCheck(start, authority, regular);
        // 예약할 날짜가 오늘보다 이전 날짜인지?
        checkPastDate(start);
        // 예약할 날짜를 보내줬을 때 원래 있던 예약과 겹치는지?
        checkDuplicateReservation(start, end);
        // 예약 시간 gap이 권한에 적합한지?
        checkTimeGap(start, end, authority);

        // 예약 저장
        Room room = roomService.detail(room_id);
        log.info("room = {}", room);
        Reservation reservation = Reservation.createReservation(reservationDto, loginMember, room);
        log.info("reservation = {}", reservation);
        reservationService.makeReservation(reservation);

        // remove Cnt
        memberService.removeCnt(loginMember.getId());

        return new ResponseEntity<>(reservation.getId(), HttpStatus.OK);
    }

    private void checkNormalAndRegularCheck(LocalDateTime start, AuthState authority, Boolean regular) {
        Month todayMonth = LocalDateTime.now().getMonth();
        Month reservationMonth = start.getMonth();
        int regularGapMonth = 0;
        if(regular) {
            // 정기예약일경우
            switch (authority) {
                case UNI_STUDENT:
                    regularGapMonth = managementService.getUnivRegularGap();
                    break;
                case POST_STUDENT:
                    regularGapMonth = managementService.getPostRegularGap();
                    break;
                case OFFICE:
                    regularGapMonth = managementService.getOfficeRegularGap();
                    break;
                case PROFESSOR:
                    regularGapMonth = managementService.getProRegularGap();
                    break;
            }
            if(todayMonth.getValue() + regularGapMonth < reservationMonth.getValue()) {
                throw new NotAvailableReservedException("권한에 부여된 정기예약 가능 달이 아닙니다.");
            }
        } else {
            // 일반 예약일경우
            if(reservationMonth != todayMonth) {
                throw new NotAvailableReservedException("일반 예약은 이번달 예약만 가능합니다.");
            }
        }
    }

    private void checkDuplicateReservation(LocalDateTime start, LocalDateTime end) {
        if(!reservationService.isPossibleTime(start, end)) {
            throw new AlreadyReservedException("이미 다른 예약이 되어있는 시간입니다. 다른 시간대를 선택해주십시오.");
        }
    }

    private void checkPastDate(LocalDateTime start) {
        LocalDateTime todayDate = LocalDateTime.now();
        log.info("오늘 날짜 = {}", todayDate);
        if(start.isBefore(todayDate)) {
            throw new NotAvailableReservedException("현재 보다 이전 시간 예약은 불가능합니다.");
        }
    }

    private void checkTimeGap(LocalDateTime start, LocalDateTime end, AuthState authority) {
        int requestGap = end.getHour() - start.getHour();
        int authGap = 0;
        switch (authority) {
            case UNI_STUDENT:
                authGap = managementService.getUnivTimeGap();
                break;
            case POST_STUDENT:
                authGap = managementService.getPostTimeGap();
                break;
            case PROFESSOR:
                authGap = managementService.getProTimeGap();
                break;
            case OFFICE:
                authGap = managementService.getOfficeTimeGap();
                break;
        }
        if(authGap < requestGap) {
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
    public ResponseEntity<List<ReservationsDto>> userList(@Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }

        List<ReservationsDto> reservations =
                reservationService.userList(loginMember.getStudentNo());

        log.info("sno = {}", loginMember.getStudentNo());
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("user-list-reserved")
    public ResponseEntity<List<ReservationsDto>> userListReserved(@Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }

        List<ReservationsDto> reservations =
                reservationService.userListStatus(loginMember.getStudentNo(), ReservationStatus.RESERVED);

        log.info("sno = {}", loginMember.getStudentNo());
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("user-list-finished")
    public ResponseEntity<List<ReservationsDto>> userListFinished(@Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }

        List<ReservationsDto> reservations =
                reservationService.userListStatus(loginMember.getStudentNo(), ReservationStatus.FINISHED);

        log.info("sno = {}", loginMember.getStudentNo());
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("user-list-canceled")
    public ResponseEntity<List<ReservationsDto>> userListCanceled(@Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }

        List<ReservationsDto> reservations =
                reservationService.userListStatus(loginMember.getStudentNo(), ReservationStatus.CANCELED);

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
    public void deleteAll(@Login Member loginMember) {
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

    @GetMapping("today-reserve-cnt")
    public ResponseEntity<Integer> getTodayReserveCnt(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @RequestParam("day") int day) {
        LocalDateTime todayDate = LocalDateTime.of(year, month, day, 0, 0);
        log.info("date = {}", todayDate);
        int todayReserveCnt = reservationService.getTodayReserveCnt(todayDate);
        return ResponseEntity.ok(todayReserveCnt);
    }

    @GetMapping("past-limitation")
    public ResponseEntity<Integer> limitPastReservation(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @RequestParam("day") int day) {
        LocalDateTime todayDate = LocalDateTime.of(year, month, day, 0, 0);
        log.info("date = {}", todayDate);
        int todayReserveCnt = reservationService.getTodayReserveCnt(todayDate);
        return ResponseEntity.ok(todayReserveCnt);
    }


}
