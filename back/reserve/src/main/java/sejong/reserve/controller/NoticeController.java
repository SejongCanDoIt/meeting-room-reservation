package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Notice;
import sejong.reserve.domain.Room;
import sejong.reserve.dto.CreateRequestNoticeDto;
import sejong.reserve.dto.UpdateRequestNoticeDto;
import sejong.reserve.service.NoticeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("/insert")
    public Long insert(@RequestBody CreateRequestNoticeDto noticeInfo) {
        Long noticeId = noticeService.createNotice(noticeInfo);
        return noticeId;
    }

    @GetMapping("list")
    public ResponseEntity<List<Notice>> list() {
        List<Notice> noticeList = noticeService.list();
        if (!noticeList.isEmpty()) {
            return ResponseEntity.ok(noticeList);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("detail/{notice_id}")
    public ResponseEntity<Notice> detail(@PathVariable Long notice_id) {
        Notice notice = noticeService.detail(notice_id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update")
    public void update(@RequestBody UpdateRequestNoticeDto updateNoticeInfo) {
        noticeService.update(updateNoticeInfo);
    }


    @DeleteMapping("delete/{notice_id}")
    public void delete(@PathVariable Long notice_id) {
        noticeService.delete(notice_id);
    }


}
