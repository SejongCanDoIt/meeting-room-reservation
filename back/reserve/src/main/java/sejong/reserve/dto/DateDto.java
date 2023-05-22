package sejong.reserve.dto;

import lombok.Data;

@Data
public class DateDto {
    private Integer year;
    private Integer month;
    private Integer day;

    public DateDto() {
    }

    public DateDto(Integer year, Integer month, Integer day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
