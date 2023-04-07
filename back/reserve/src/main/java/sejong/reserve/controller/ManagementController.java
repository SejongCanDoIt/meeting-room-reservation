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

    @PutMapping("update-gap")
    public void updateGap(@RequestParam int univ_gap, @RequestParam int post_gap, @RequestParam int pro_gap) {
        managementService.updateGap(univ_gap, post_gap, pro_gap);
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

    @GetMapping("univ-gap")
    public ResponseEntity<Integer> getUnivGap() {
        return ResponseEntity.ok(managementService.getUnivGap());
    }

    @GetMapping("post-gap")
    public ResponseEntity<Integer> getPostGap() {
        return ResponseEntity.ok(managementService.getPostGap());
    }

    @GetMapping("pro-gap")
    public ResponseEntity<Integer> getProGap() {
        return ResponseEntity.ok(managementService.getProGap());
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
