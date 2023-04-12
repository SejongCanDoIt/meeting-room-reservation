package sejong.reserve.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class Time {
    LocalDateTime start;
    LocalDateTime end;

    public Time(LocalDateTime start, LocalDateTime end) {
        this.start = start;
        this.end = end;
    }
}
