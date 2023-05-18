package sejong.reserve.dto;

import lombok.Data;

@Data
public class DateByRoomDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long roomId;

    public DateByRoomDto() {
    }

    public DateByRoomDto(Integer year, Integer month, Integer day, Long roomId) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.roomId = roomId;
    }
}
