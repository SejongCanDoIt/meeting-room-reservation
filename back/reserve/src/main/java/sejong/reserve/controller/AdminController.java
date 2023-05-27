package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Notice;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.dto.CreateRequestNoticeDto;
import sejong.reserve.dto.UpdateAdminDto;
import sejong.reserve.dto.UpdateRequestNoticeDto;
import sejong.reserve.service.AdminService;
import sejong.reserve.service.NoticeService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;



    @GetMapping
    public ResponseEntity<AdminDto> getAdminInfo() {
        AdminDto adminInfo = adminService.getAdminInfo();
        return ResponseEntity.ok(adminInfo);
    }


    @PatchMapping("/update")
    public void update(@RequestBody UpdateAdminDto updateAdminDto) {
        adminService.update(updateAdminDto);
    }

}
