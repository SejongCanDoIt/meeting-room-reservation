package sejong.reserve.dto;

import lombok.Data;

@Data
public class MonthDateByRoomDto {
    private Integer year;
    private Integer month;
    private Long roomId;
}
