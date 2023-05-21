package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateRequestNoticeDto {
    private Long noticeId;
    private String title; // 공지 제목

    private String content; // 공지 내용

    public UpdateRequestNoticeDto() {
    }

    public UpdateRequestNoticeDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
