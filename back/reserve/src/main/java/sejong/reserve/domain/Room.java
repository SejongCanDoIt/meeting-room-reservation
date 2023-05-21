package sejong.reserve.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "room")
@ToString(exclude = "reservationLogs")
public class Room {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id; // 회의실 id

    private String name; // 회의실 이름

    @Enumerated(EnumType.STRING)
    @Column(name = "building_name")
    private SejongBuildingName buildingName; // 회의실 빌딩이름

    @ColumnDefault("0")
    private int cap; // 수용인원

    private String info; // 회의실 상세정보

    @ColumnDefault("0")
    private int board; // 화이트보드 개수

    @ColumnDefault("0")
    private int tv; // 티비 개수

    @ColumnDefault("0")
    private int com; // 컴퓨터 개수

    private String picture; // 사진 경로

    @Column(columnDefinition = "TINYINT(1)", nullable = false, name = "empty1")
    @ColumnDefault("0")
    private Boolean empty; // 회의실 예약 가능 여부

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean wifi; // 와이파이 여부

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean bim_projector; // 빔프로젝터 여부

    @JsonIgnore
    @OneToMany(mappedBy = "room", cascade = CascadeType.REMOVE)
    private List<Reservation> reservationLogs;

    //==생성 메서드==//
    public static Room createRoom(Room roomInfo) {
        Room room = new Room();

        setRoom(room, roomInfo);

        return room;
    }

    public static void setRoom(Room room, Room roomInfo) {
        room.setName(roomInfo.getName());
        room.setBuildingName(roomInfo.getBuildingName());
        room.setCap(roomInfo.getCap());
        room.setInfo(roomInfo.getInfo());
        room.setBoard(roomInfo.getBoard());
        room.setTv(roomInfo.getTv());
        room.setPicture(roomInfo.getPicture());
        room.setEmpty(roomInfo.getEmpty());
        room.setEmpty(roomInfo.getEmpty());
        room.setWifi(roomInfo.getWifi());
        room.setBim_projector(roomInfo.getBim_projector());
    }

}
