package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Notice;
import sejong.reserve.dto.CreateRequestNoticeDto;
import sejong.reserve.dto.UpdateRequestNoticeDto;
import sejong.reserve.repository.NoticeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    public Long createNotice(CreateRequestNoticeDto noticeInfo) {
        Notice notice = Notice.createNotice(noticeInfo);
        // 공지사항 저장
        noticeRepository.save(notice);
        return notice.getId();
    }

    /**
     * 공지사항 전체 조회
     */
    public List<Notice> list() {
        List<Notice> noticeList = noticeRepository.findAll();
        return noticeList;
    }

    public Notice detail(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).get();
        return notice;
    }

    /**
     * 공지사항 수정
     */
    @Transactional
    public void update(UpdateRequestNoticeDto updateNoticeInfo) {
        Notice notice = noticeRepository.findById(updateNoticeInfo.getNoticeId()).get();
        notice.setTitle(updateNoticeInfo.getTitle());
        notice.setContent(updateNoticeInfo.getContent());
    }

    /**
     * 공지사항 삭제
     */
    @Transactional
    public void delete(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).get();
        noticeRepository.delete(notice);
    }


}
