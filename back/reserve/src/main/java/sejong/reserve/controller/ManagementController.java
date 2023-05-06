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
    public void updateCnt(@RequestParam int univ_cnt, @RequestParam int post_cnt, @RequestParam int pro_cnt) {
        managementService.updateCnt(univ_cnt, post_cnt, pro_cnt);
    }

    @PutMapping("update-time-gap")
    public void updateTimeGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateTimeGap(univ_gap, post_gap, office_gap, pro_gap);
    }

    @PutMapping("update-regular-gap")
    public void updateRegularGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int office_gap, @RequestParam int pro_gap) {
        managementService.updateRegularGap(univ_gap, post_gap, office_gap, pro_gap);
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

    @GetMapping("univ-time-gap")
    public ResponseEntity<Integer> getUnivTimeGap() {
        return ResponseEntity.ok(managementService.getUnivTimeGap());
    }

    @GetMapping("post-time-gap")
    public ResponseEntity<Integer> getPostTimeGap() {
        return ResponseEntity.ok(managementService.getPostTimeGap());
    }

    @GetMapping("office-time-gap")
    public ResponseEntity<Integer> getOfficeTimeGap() {
        return ResponseEntity.ok(managementService.getOfficeTimeGap());
    }
    @GetMapping("pro-time-gap")
    public ResponseEntity<Integer> getProTimeGap() {
        return ResponseEntity.ok(managementService.getProTimeGap());
    }

    @GetMapping("univ-regular-gap")
    public ResponseEntity<Integer> getUnivRegularGap() {
        return ResponseEntity.ok(managementService.getUnivRegularGap());
    }

    @GetMapping("post-regular-gap")
    public ResponseEntity<Integer> getPostRegularGap() {
        return ResponseEntity.ok(managementService.getPostRegularGap());
    }

    @GetMapping("office-regular-gap")
    public ResponseEntity<Integer> getOfficeRegularGap() {
        return ResponseEntity.ok(managementService.getOfficeRegularGap());
    }
    @GetMapping("pro-regular-gap")
    public ResponseEntity<Integer> getProRegularGap() {
        return ResponseEntity.ok(managementService.getProRegularGap());
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
