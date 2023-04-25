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

    private String name; // 회의실 이름

    private String loc; // 회의실 위치

    private int cap; // 수용인원

    private String info; // 회의실 상세정보

    private int board; // 화이트보드 개수

    private int tv; // 티비 개수

    private int com; // 컴퓨터 개수

    private String picture; // 사진 경로

    private Boolean empty; // 회의실 예약 가능 여부

    private Boolean wifi; // 와이파이 여부

    private Boolean bim_projector; // 빔프로젝터 여부

    public RoomDto(Room roomInfo) {
        this.id = roomInfo.getId();
        this.name = roomInfo.getName();
        this.loc = roomInfo.getLoc();
        this.cap = roomInfo.getCap();
        this.info = roomInfo.getInfo();
        this.board = roomInfo.getBoard();
        this.tv = roomInfo.getTv();
        this.com = roomInfo.getCom();
        this.picture = roomInfo.getPicture();
        this.empty = roomInfo.getEmpty();
        this.wifi = roomInfo.getWifi();
        this.bim_projector = roomInfo.getBim_projector();
    }

}
