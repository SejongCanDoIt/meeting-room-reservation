package sejong.reserve.domain;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.dto.CreateRequestNoticeDto;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notice")
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id; // 공지 id

    private String title; // 공지 제목

    private String content; // 공지 내용

    @Column(name = "created_at")
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now(); // 공지 게시글 생성 날짜


    //==생성 메서드==//
    public static Notice createNotice(CreateRequestNoticeDto noticeInfo) {
        Notice notice = new Notice();
        notice.setTitle(noticeInfo.getTitle());
        notice.setContent(noticeInfo.getContent());
        return notice;
    }
}
