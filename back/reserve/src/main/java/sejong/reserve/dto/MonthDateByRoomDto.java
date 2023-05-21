package sejong.reserve.dto;

import lombok.Data;

@Data
public class MonthDateByRoomDto {
    private Integer year;
    private Integer month;
    private Long roomId;

    public MonthDateByRoomDto() {
    }

    public MonthDateByRoomDto(Integer year, Integer month, Long roomId) {
        this.year = year;
        this.month = month;
        this.roomId = roomId;
    }
}
