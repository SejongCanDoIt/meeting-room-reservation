package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class TimeDto {
    LocalDateTime start;
    LocalDateTime end;

    public TimeDto(LocalDateTime start, LocalDateTime end) {
        this.start = start;
        this.end = end;
    }
}
