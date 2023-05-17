package sejong.reserve.dto;

import lombok.Data;

@Data
public class DateByRoomDto {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long roomId;
}
