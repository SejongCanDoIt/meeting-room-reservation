package sejong.reserve.vo;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity(name = "Reservation_Queue")
@Data
@DynamicInsert
@Table(name = "WAITING")
public class Waiting {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 예약대기번호

    @ColumnDefault("false")
    private Boolean success; // 예약 성공 여부

    @OneToOne
    @JoinColumn(name = "RESERVATION_ID")
    private Reservation reservation;
}
