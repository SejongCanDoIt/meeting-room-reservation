package sejong.reserve.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Data
@DynamicInsert
@Table(name = "ROOM")
public class Room {
    @Id
    private String name; // 회의실 이름
    private String loc; // 회의실 위치
    @ColumnDefault("0")
    private int cap; // 수용인원
    private String info; // 회의실 상세정보
    @ColumnDefault("true")
    private boolean check; // 회의실 예약 가능 여부
    @ColumnDefault("true")
    private boolean wifi; // 와이파이 여부
    @ColumnDefault("true")
    private boolean bim; // 빔프로젝터 여부
    @ColumnDefault("0")
    private int board; // 화이트보드 개수
    @ColumnDefault("0")
    private int tv; // 티비 개수
    @ColumnDefault("0")
    private int com; // 컴퓨터 개수
    private String picture; // 사진 경로

    @OneToOne(mappedBy = "room")
    private Reservation reservation;
}
