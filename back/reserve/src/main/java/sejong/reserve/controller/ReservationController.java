package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.*;
import sejong.reserve.dto.*;
import sejong.reserve.service.*;
import sejong.reserve.web.argumentresolver.Login;
import sejong.reserve.web.exception.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.chrono.ChronoLocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/reserve")
public class ReservationController {
    private final ReservationService reservationService;
    private final ManagementService managementService;
    private final RoomService roomService;
    private final MemberService memberService;

    private final EmailService emailService;


    @PostMapping
    public ResponseEntity<Long> makeReservation(@RequestBody ReservationDto reservationDto,
                                @RequestParam Long room_id,
                                @Login Member loginMember) {
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }
        log.info("loginMember = {}", loginMember);
        log.info("room_id = {}", room_id); // 예약된 방의 id를 로깅합니다.

        log.info("loginMember = {}", loginMember);
        log.info("room_id = {}", room_id); // 예약된 방의 id를 로깅합니다.

        LocalDateTime start = reservationDto.getStart();
        LocalDateTime end = reservationDto.getEnd();
        AuthState authority = loginMember.getAuthority();

        log.info("start = {}", start); // 예약 시작 시간을 로깅합니다.
        log.info("end = {}", end); // 예약 종료 시간을 로깅합니다.
        log.info("authority = {}", authority); // 사용자 권한을 로깅합니다.

        if(authority == AuthState.UNI_STUDENT && reservationDto.getRegular()==true) {
            throw new NotAvailableReservedException("학부생은 정기예약을 진행할 수 없습니다.");
        }

        // 시작 시간이 끝 시간 보다 앞인지?
        checkStartEnd(start, end);
        // 정기 및 일반 예약에 대한 달이 적합한지?
        log.info("checkStateLimitation 실행 : 정기 및 일반 예약에 대한 달이 적합한지?");
        checkStateLimitation(start, authority);
        // 예약할 날짜가 오늘보다 이전 날짜인지?
        log.info("checkPastDate 실행 : 예약할 날짜가 오늘보다 이전 날짜인지?");
        checkPastDate(start);
        // 예약할 날짜를 보내줬을 때 원래 있던 예약과 겹치는지?
        log.info("checkDuplicateReservation:  예약할 날짜를 보내줬을 때 원래 있던 예약과 겹치는지?");
        checkDuplicateReservation(start, end, room_id);
        // 예약 시간 gap 이 권한에 적합한지?
        log.info("checkTimeGap:  예약 시간 gap 이 권한에 적합한지?");
        checkTimeGap(start, end, authority);
        // 예약이 다음날로 넘어가는지?
        checkIsNextDay(start, end);

        // 예약 저장
        Room room = roomService.detail(room_id);
        Reservation reservation = Reservation.createReservation(reservationDto, loginMember, room);
        log.info("reservation = {}", reservation);
        reservationService.makeReservation(reservation);

        // remove Cnt
        memberService.removeCnt(loginMember.getId());

        log.info("요청 예약 시작 시각 = {}", reservation.getStart());
        log.info("요청 예약 끝 시각 = {}", reservation.getEnd());

        return new ResponseEntity<>(reservation.getId(), HttpStatus.OK);
    }

    private static void checkStartEnd(LocalDateTime start, LocalDateTime end) {
        if(start.isAfter(end)) {
            throw new NotAvailableReservedException("예약의 시작시간은 끝 시간 보다 앞서야 합니다");
        }
    }

    private static void checkIsNextDay(LocalDateTime start, LocalDateTime end) {
        log.info("start.getDayOfMonth() = {}", start.getDayOfMonth());
        log.info("end.getDayOfMonth() = {}", end.getDayOfMonth());

        if(end.getDayOfMonth() > start.getDayOfMonth()) {
            throw new NotAvailableReservedException("예약은 오늘 날짜 안에서만 가능합니다.");
        }
    }

    @PostMapping("/email")
    private void sendEmail(@Login Member loginMember, @RequestParam("reservation_id") Long reservationId) {
        Reservation reservation = reservationService.getReservation(reservationId).get();
        log.info("reservation = {}", reservationService.getReservation(reservationId).get());
        String emailSubject = loginMember.getName()+"님의 예약이 완료되었습니다.";// 메일의 제목을 여기에다 적으면 됩니다.
        String emailText = "예약이 완료되었습니다.\n 시작시간: " + reservation.getStart() + "\n 종료시간: " + reservation.getEnd()+"\n장소: "+reservation.getRoom().getName(); //이메일에 들어갈 문장들 여기에 적으면 됩니다.
        emailService.sendSimpleMessage(loginMember.getEmail(), emailSubject, emailText); // 이메일 보내기
    }

    @PostMapping("/email-regular")
    private void sendRegularEmail(@Login Member loginMember, @RequestParam("reservation_id") Long reservationId,
                                  @RequestParam("repeat_type") String repeatType, @RequestParam("repeat_count") int repeatCount) {

        // 해당 reservation 가져오기
        Reservation reservation = reservationService.getReservation(reservationId).get();
        String emailSubject = loginMember.getName()+"님의 정기예약이 완료되었습니다.";

        String repeat;
        if(repeatType.equals("daily")){
            repeat = "일간";
        } else if (repeatType.equals("weekly")) {
            repeat = "주간";
        }else if(repeatType.equals("monthly")){
            repeat = "월간";
        }else{
            repeat = repeatType;
        }

        String emailText = "정기예약이 "+repeat+" "+repeatCount+"번으로 설정되었습니다. "
                + "예약 시작일: "+ reservation.getStart() + ", 예약 종료일: "+ reservation.getEnd();

        emailService.sendSimpleMessage(loginMember.getEmail(), emailSubject, emailText);
    }

    private void checkStateLimitation(LocalDateTime start, AuthState authority) {
        LocalDateTime now = LocalDateTime.now();
        int possibleGap = 0;
        switch (authority) {
            case UNI_STUDENT:
                possibleGap = managementService.getUnivDayGap();
                break;
            case POST_STUDENT:
                possibleGap = managementService.getPostDayGap();
                break;
            case OFFICE:
                possibleGap = managementService.getOfficeDayGap();
                break;
            case PROFESSOR:
                possibleGap = managementService.getProDayGap();
                break;
        }

        if(now.plusDays(possibleGap).isBefore(start)) {
            log.info("예약 가능한 마지막 날= {}", now.plusDays(possibleGap));
            log.info("예약 요청한 날 = {}", start);
            throw new NotAvailableReservedException("권한에 부여된 예약 가능 날짜가 아닙니다.");
        }

    }

    private void checkDuplicateReservation(LocalDateTime start, LocalDateTime end, Long roomId) {
        if(!reservationService.isPossibleTime(start, end, roomId)) {
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
                authGap = managementService.getUnivHourGap();
                break;
            case POST_STUDENT:
                authGap = managementService.getPostHourGap();
                break;
            case PROFESSOR:
                authGap = managementService.getProHourGap();
                break;
            case OFFICE:
                authGap = managementService.getOfficeHourGap();
                break;
        }
        if(authGap < requestGap) {
            throw new AuthorityException("권한에 부여된 시간보다 넘게 신청하셨습니다. 시간을 조절해주시길 바랍니다.");
        }
    }

    @GetMapping("/time-check")
    public Boolean timeCheck(@RequestParam LocalDateTime start,
                             @RequestParam LocalDateTime end,
                             @RequestParam Long roomId) {
        return reservationService.isPossibleTime(start, end, roomId);
    }


    @GetMapping("/get")
    public ResponseEntity<Optional<Reservation>> getReservation(@RequestParam Long reservation_id) {
        Optional<Reservation> reservation = reservationService.getReservation(reservation_id);
        if (!reservation.isEmpty()) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/manager-list")
    public ResponseEntity<List<ReservationsDto>> managerList() {
        List<ReservationsDto> reservationsDtoList = reservationService.managerList();
        if (!reservationsDtoList.isEmpty()) {
            return ResponseEntity.ok(reservationsDtoList);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/user-list")
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

    @GetMapping("/user-list-reserved")
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

    @GetMapping("/user-list-finished")
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

    @GetMapping("/user-list-canceled")
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

    @DeleteMapping("/delete-one")
    public void deleteOne(@RequestParam("reservation_id") Long reservation_id) {
        reservationService.deleteOne(reservation_id);
    }

    @DeleteMapping("/delete-all")
    public void deleteAll(@RequestParam("sno") String student_no) {
        reservationService.deleteAll(student_no);
    }

    @DeleteMapping("/login-delete-all")
    public void deleteAll(@Login Member loginMember) {
        log.info("loginMember = {}", loginMember);
        if(loginMember == null) {
            throw new NotLoginException("로그인이 안되어 있는 상태입니다.");
        }
        reservationService.deleteAll(loginMember.getStudentNo());
    }

    @PostMapping("/reset")
    public void deleteAll() {
        reservationService.reset();
    }


    @PutMapping("/set-status-reserved")
    public void updateStatusReserved(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.RESERVED, reservation_id);
    }

    @PutMapping("/set-status-finished")
    public void updateStatusFinished(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.FINISHED, reservation_id);
    }

    @PutMapping("/set-status-canceled")
    public void updateStatusCanceled(@RequestParam Long reservation_id) {
        reservationService.setStatus(ReservationStatus.CANCELED, reservation_id);
        reservationService.cancel(reservation_id);
    }

    @PostMapping("/time-list-room")
    public List<TimeDto> timeList(@RequestBody DateByRoomDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        return reservationService.getTodayTimeListRoom(todayDate, data.getRoomId());
    }

    @PostMapping("/get-reserve-list-all")
    public List<ReservationsDto> getTodayReserveList(@RequestBody DateDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        return reservationService.getTodayTimeList(todayDate);
    }

    @PostMapping("/today-time-check-room")
    public int[] getTodayTimeCheckRoom(@RequestBody DateByRoomDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        return reservationService.getTodayTimeCheckRoom(todayDate, data.getRoomId());
    }

    @PostMapping("/today-time-check")
    public int[] getTodayTimeCheck(@RequestBody DateDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        return reservationService.getTodayTimeCheck(todayDate);
    }

    @PostMapping("/month-reserve-check")
    public List<Integer> getMonthReserveCheck(@RequestBody MonthDateByRoomDto data) {
        return reservationService.getMonthReserveCheck(data.getYear(), Month.of(data.getMonth()), data.getRoomId());
    }

    @PostMapping("/today-reserve-cnt-room")
    public ResponseEntity<Integer> getTodayReserveCntByRoom(@RequestBody DateByRoomDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        log.info("date = {}", todayDate);
        int todayReserveCnt = reservationService.getTodayReserveCntByRoom(todayDate, data.getRoomId());
        return ResponseEntity.ok(todayReserveCnt);
    }

    @PostMapping("/today-reserve-cnt-all")
    public ResponseEntity<Integer> getTodayReserveCntAll(@RequestBody DateDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        log.info("date = {}", todayDate);
        int todayReserveCnt = reservationService.getTodayReserveCntAll(todayDate);
        return ResponseEntity.ok(todayReserveCnt);
    }

    @PostMapping("/past-limitation")
    public ResponseEntity<Integer> limitPastReservation(@RequestBody DateByRoomDto data) {
        LocalDateTime todayDate = LocalDateTime.of(data.getYear(), data.getMonth(), data.getDay(), 0, 0);
        log.info("date = {}", todayDate);
        int todayReserveCnt = reservationService.getTodayReserveCntByRoom(todayDate,  data.getRoomId());
        return ResponseEntity.ok(todayReserveCnt);
    }

    @GetMapping("/list-using-sno")
    public ResponseEntity<List<ReservationsDto>> getReservationList(@RequestParam String sno) {
        Member member = memberService.findByStudentNo(sno);
        List<ReservationsDto> reservations =
                reservationService.getReservationListBySno(member.getStudentNo());

        log.info("sno = {}", member);
        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PatchMapping("/check-noshow")
    public ResponseEntity<Boolean> checkNoShow(@Login Member loginMember) {
        LocalDateTime now = LocalDateTime.now();
        if(reservationService.getReserveCntBySno(loginMember.getStudentNo()) == 0) {
            throw new NotAvailableNoShowCheckException("예약 내역이 존재하지 않은 회원입니다.");
        }
        List<ReservationsDto> reservationList = reservationService.getReservationListBySnoAndStatus(loginMember.getStudentNo(), ReservationStatus.RESERVED);
        for(ReservationsDto reservation : reservationList) {
            log.info("예약 시작 시간: {}, 예약 끝나는 시간: {}, 예약 노쇼 체크 = {}", reservation.getStart(), reservation.getEnd(), reservation.getNoShowCheck());
            if (reservation.getStart().isBefore(now) && reservation.getEnd().isAfter(now)) {
                reservationService.checkNoShow(reservation.getReservation_id(), true);
                return ResponseEntity.ok(reservation.getNoShowCheck());
            } else {
                memberService.addNoShowCnt(loginMember.getStudentNo());
                throw new NotAvailableNoShowCheckException("인증 시간이 아니므로 인증이 되지 않습니다.");
            }
        }
        return ResponseEntity.ok(true);
    }


    @GetMapping("/get-reserve-cnt-all")
    public ResponseEntity<Integer> getReserveCntAll() {
        return ResponseEntity.ok(reservationService.getReserveCntAll());
    }

    @GetMapping("/get-reserve-cnt-authority")
    public ResponseEntity<Integer> getReserveCntByAuthority(@RequestParam AuthState authority) {
        return ResponseEntity.ok(reservationService.getReserveCntByAuthority(authority));
    }

}
