//package sejong.reserve.domain;
//
//import lombok.Data;
//import org.hibernate.annotations.ColumnDefault;
//import org.hibernate.annotations.DynamicInsert;
//
//import javax.persistence.*;
//
//@Entity(name = "Reservation_Queue")
//@Data
//@DynamicInsert
//@Table(name = "waiting")
//public class Waiting {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "wait_id")
//    private Long id; // 예약대기번호
//
//    @Column(columnDefinition = "TINYINT(1)", nullable = false)
//    @ColumnDefault("0")
//    private Boolean success; // 예약 성공 여부
//
//
//}
