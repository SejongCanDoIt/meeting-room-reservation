package sejong.reserve.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Data
@DynamicInsert
@Table(name = "room")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id; // 회의실 id

    private String name; // 회의실 이름

    private String loc; // 회의실 위치

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

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean empty; // 회의실 예약 가능 여부

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean wifi; // 와이파이 여부

    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @ColumnDefault("0")
    private Boolean bim_projector; // 빔프로젝터 여부

}
