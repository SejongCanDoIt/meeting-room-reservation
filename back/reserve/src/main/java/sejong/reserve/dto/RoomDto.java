package sejong.reserve.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import sejong.reserve.domain.Room;

import javax.persistence.Column;

@Getter
@Setter
@ToString
public class RoomDto {
    private Long id; // 회의실 id



    public RoomDto(Room roomInfo) {
        this.id = roomInfo.getId();
    }

}
