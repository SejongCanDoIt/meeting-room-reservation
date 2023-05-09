package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Management;
import sejong.reserve.service.ManagementService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage/")
public class ManagementController {

    private final ManagementService managementService;

    @PutMapping("update-cnt")
    public void updateCnt(@RequestParam int univ_cnt, @RequestParam int post_cnt, @RequestParam int pro_cnt, @RequestParam int office_cnt) {
        managementService.updateCnt(univ_cnt, post_cnt, pro_cnt, office_cnt);
    }

    @PutMapping("update-hour-gap")
    public void updateHourGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateTimeGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @PutMapping("update-week-gap")
    public void updateWeekGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updatePossibleGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @GetMapping("univ-cnt")
    public ResponseEntity<Integer> getUnivCnt() {
        return ResponseEntity.ok(managementService.getUnivCnt());
    }

    @GetMapping("post-cnt")
    public ResponseEntity<Integer> getPostCnt() {
        return ResponseEntity.ok(managementService.getPostCnt());
    }

    @GetMapping("pro-cnt")
    public ResponseEntity<Integer> getProCnt() {
        return ResponseEntity.ok(managementService.getProCnt());
    }

    @GetMapping("office-cnt")
    public ResponseEntity<Integer> getOfficeCnt() {
        return ResponseEntity.ok(managementService.getProCnt());
    }

    @GetMapping("univ-hour-gap")
    public ResponseEntity<Integer> getUnivHourGap() {
        return ResponseEntity.ok(managementService.getUnivHourGap());
    }

    @GetMapping("post-hour-gap")
    public ResponseEntity<Integer> getPostHourGap() {
        return ResponseEntity.ok(managementService.getPostHourGap());
    }

    @GetMapping("office-hour-gap")
    public ResponseEntity<Integer> getOfficeHourGap() {
        return ResponseEntity.ok(managementService.getOfficeHourGap());
    }
    @GetMapping("pro-hour-gap")
    public ResponseEntity<Integer> getProHourGap() {
        return ResponseEntity.ok(managementService.getProHourGap());
    }

    @GetMapping("univ-week-gap")
    public ResponseEntity<Integer> getUnivWeekGap() {
        return ResponseEntity.ok(managementService.getUnivWeekGap());
    }

    @GetMapping("post-week-gap")
    public ResponseEntity<Integer> getPostWeekGap() {
        return ResponseEntity.ok(managementService.getPostWeekGap());
    }

    @GetMapping("office-week-gap")
    public ResponseEntity<Integer> getOfficeWeekGap() {
        return ResponseEntity.ok(managementService.getOfficeWeekGap());
    }
    @GetMapping("pro-week-gap")
    public ResponseEntity<Integer> getProWeekGap() {
        return ResponseEntity.ok(managementService.getProWeekGap());
    }

    @GetMapping
    public ResponseEntity<Management> getManagement() {
        return ResponseEntity.ok(managementService.getManagement());
    }

    @PutMapping("cnt-reset")
    public void resetCnt() {
        managementService.resetCntAll();
    }

}
