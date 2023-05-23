package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Management;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.ManagementDto;
import sejong.reserve.dto.MemberDto;
import sejong.reserve.dto.ReservationsDto;
import sejong.reserve.service.ManagementService;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;
import sejong.reserve.web.argumentresolver.Login;
import sejong.reserve.web.exception.NotLoginException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/manage")
public class ManagementController {

    private final ManagementService managementService;
    private final ReservationService reservationService;
    private final MemberService memberService;


    @PatchMapping("/update")
    public ResponseEntity<?> updateManagement(@RequestBody ManagementDto managementDto) {
        managementService.update(managementDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/update-cnt")
    public void updateCnt(@RequestParam int univ_cnt, @RequestParam int post_cnt, @RequestParam int pro_cnt, @RequestParam int office_cnt) {
        managementService.updateCnt(univ_cnt, post_cnt, pro_cnt, office_cnt);
    }

    @PutMapping("/update-hour-gap")
    public void updateHourGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateHourGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @PutMapping("/update-week-gap")
    public void updateWeekGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateWeekGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @PutMapping("/update-day-gap")
    public void updateDayGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateDayGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @GetMapping("univ-cnt")
    public ResponseEntity<Integer> getUnivCnt() {
        return ResponseEntity.ok(managementService.getUnivCnt());
    }

    @GetMapping("/post-cnt")
    public ResponseEntity<Integer> getPostCnt() {
        return ResponseEntity.ok(managementService.getPostCnt());
    }

    @GetMapping("/pro-cnt")
    public ResponseEntity<Integer> getProCnt() {
        return ResponseEntity.ok(managementService.getProCnt());
    }

    @GetMapping("/office-cnt")
    public ResponseEntity<Integer> getOfficeCnt() {
        return ResponseEntity.ok(managementService.getProCnt());
    }

    @GetMapping("/univ-hour-gap")
    public ResponseEntity<Integer> getUnivHourGap() {
        return ResponseEntity.ok(managementService.getUnivHourGap());
    }

    @GetMapping("/post-hour-gap")
    public ResponseEntity<Integer> getPostHourGap() {
        return ResponseEntity.ok(managementService.getPostHourGap());
    }

    @GetMapping("/office-hour-gap")
    public ResponseEntity<Integer> getOfficeHourGap() {
        return ResponseEntity.ok(managementService.getOfficeHourGap());
    }
    @GetMapping("/pro-hour-gap")
    public ResponseEntity<Integer> getProHourGap() {
        return ResponseEntity.ok(managementService.getProHourGap());
    }

    @GetMapping("/univ-day-gap")
    public ResponseEntity<Integer> getUnivDayGap() {
        return ResponseEntity.ok(managementService.getUnivDayGap());
    }

    @GetMapping("/post-day-gap")
    public ResponseEntity<Integer> getPostDayGap() {
        return ResponseEntity.ok(managementService.getPostDayGap());
    }

    @GetMapping("/office-day-gap")
    public ResponseEntity<Integer> getOfficeDayGap() {
        return ResponseEntity.ok(managementService.getOfficeDayGap());
    }
    @GetMapping("/pro-day-gap")
    public ResponseEntity<Integer> getProDayGap() {
        return ResponseEntity.ok(managementService.getProDayGap());
    }

    @GetMapping("/univ-week-gap")
    public ResponseEntity<Integer> getUnivWeekGap() {
        return ResponseEntity.ok(managementService.getUnivWeekGap());
    }

    @GetMapping("/post-week-gap")
    public ResponseEntity<Integer> getPostWeekGap() {
        return ResponseEntity.ok(managementService.getPostWeekGap());
    }

    @GetMapping("/office-week-gap")
    public ResponseEntity<Integer> getOfficeWeekGap() {
        return ResponseEntity.ok(managementService.getOfficeWeekGap());
    }
    @GetMapping("/pro-week-gap")
    public ResponseEntity<Integer> getProWeekGap() {
        return ResponseEntity.ok(managementService.getProWeekGap());
    }

    @GetMapping
    public ResponseEntity<Management> getManagement() {
        return ResponseEntity.ok(managementService.getManagement());
    }

    @PutMapping("/cnt-reset")
    public void resetCnt() {
        managementService.resetCntAll();
    }



    @GetMapping("/member") // 학생별 검색, 이름과 학번으로 검색
    public ResponseEntity<List<MemberDto>> findMember(@RequestParam("q") String q) {
        List<MemberDto> memberDtoList = memberService.findMemberBySnoOrName(q);
        return ResponseEntity.ok(memberDtoList);
    }
    @GetMapping("/date") // 날짜별 검색
    public ResponseEntity<List<ReservationsDto>> getReservationListByDate(@RequestParam("year") int year,
                                                                          @RequestParam("month") int month,
                                                                          @RequestParam("day") int day) {

        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime dateStart = currentTime;
        LocalDateTime dateEnd = LocalDateTime.of(currentTime.getYear(), currentTime.getMonth(), currentTime.getDayOfMonth()+1, 0, 0);

        // 일이 0 -> 월별 기준
        if(day == 0 && year !=0 && month !=0) { // 월별 검색
            dateStart = LocalDateTime.of(year, month, 1, 0, 0);
            dateEnd = LocalDateTime.of(year, month+1, 1, 0, 0);
        }

        // 일과 월이 0 -> 연별 기준
        if(day == 0 && month == 0 && year !=0) { // 연도별 검색
            dateStart = LocalDateTime.of(year, 1, 1, 0, 0);
            dateEnd = LocalDateTime.of(year+1, 1, 1, 0, 0);
        }

        // 일별 검색
        if(day != 0 && month != 0 && year !=0) {
            dateStart = LocalDateTime.of(year, month, day, 0, 0);
            dateEnd = LocalDateTime.of(year, month, day+1, 0, 0);
        }

        // 날짜별 전체 예약 리스트 반환
        List<ReservationsDto> reservationList = reservationService.getReservationListByDate(dateStart, dateEnd);
        return ResponseEntity.ok(reservationList);
    }

    @GetMapping("/no-show")
    public ResponseEntity<List<MemberDto>> findMemberOverNoShow(@RequestParam("noShowCnt") int noShowCnt) {
        // 입력된 noShowCnt 이상의 noShowCnt 값을 가지고 있는 멤버리스트 반환
        List<MemberDto> memberDtoList = memberService.findMemberByNoShow(noShowCnt);
        return ResponseEntity.ok(memberDtoList);
    }
}
