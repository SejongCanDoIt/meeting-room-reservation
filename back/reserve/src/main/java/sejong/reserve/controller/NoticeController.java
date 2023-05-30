package sejong.reserve.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Notice;
import sejong.reserve.domain.Room;
import sejong.reserve.dto.CreateRequestNoticeDto;
import sejong.reserve.dto.UpdateRequestNoticeDto;
import sejong.reserve.service.NoticeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping("/insert")
    public Long insert(HttpServletRequest request) {
        try {
            String body = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            String decodedBody = URLDecoder.decode(body, StandardCharsets.UTF_8.name());
            // 이제 decodedBody에는 URL 디코딩된 본문이 있습니다.
            // decodedBody를 JSON으로 파싱하여 CreateRequestNoticeDto 객체를 생성
            ObjectMapper objectMapper = new ObjectMapper();
            CreateRequestNoticeDto noticeInfo = objectMapper.readValue(decodedBody, CreateRequestNoticeDto.class);
            log.info("notice 정보 = {}", noticeInfo);
            Long noticeId = noticeService.createNotice(noticeInfo);
            return noticeId;
        } catch (IOException e) {
            // 요청 본문을 읽는 도중 오류가 발생한 경우에 대한 처리
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Notice>> list() {
        List<Notice> noticeList = noticeService.list();
        if (!noticeList.isEmpty()) {
            return ResponseEntity.ok(noticeList);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/detail/{notice_id}")
    public ResponseEntity<Notice> detail(@PathVariable Long notice_id) {
        Notice notice = noticeService.detail(notice_id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PatchMapping("/update")
            public void update(HttpServletRequest request) {
                try {
                    String body = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                    String decodedBody = URLDecoder.decode(body, StandardCharsets.UTF_8.name());
                    // 이제 decodedBody에는 URL 디코딩된 본문이 있습니다.
                    // decodedBody를 JSON으로 파싱하여 UpdateRequestNoticeDto 객체를 생성
                    ObjectMapper objectMapper = new ObjectMapper();
                    UpdateRequestNoticeDto updateNoticeInfo = objectMapper.readValue(decodedBody, UpdateRequestNoticeDto.class);
            noticeService.update(updateNoticeInfo);
        } catch (IOException e) {
            // 요청 본문을 읽는 도중 오류가 발생한 경우에 대한 처리
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{notice_id}")
    public void delete(@PathVariable Long notice_id) {
        noticeService.delete(notice_id);
    }


}
