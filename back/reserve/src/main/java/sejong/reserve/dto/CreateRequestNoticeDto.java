package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreateRequestNoticeDto {
    private String title; // 공지 제목

    private String content; // 공지 내용

    public CreateRequestNoticeDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
