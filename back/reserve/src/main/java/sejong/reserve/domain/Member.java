package sejong.reserve.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sejong.reserve.web.exception.NotEnoughCntException;
import sejong.reserve.web.function.AuthStateConverter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter @Setter
@ToString(exclude = "reservationLogs")
@Table(name = "member")
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "member_sequence")
    @SequenceGenerator(name = "member_sequence", sequenceName = "member_sequence", initialValue = 1, allocationSize = 1)
    @Column(name = "member_id")
    private Long id; // 예약자 번호


    @CsvBindByName(column = "학번")
    @Column(name = "sno", updatable = false, unique = true, nullable = false)
    private String studentNo; // 학번 (Login-ID)

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @Column(name = "pwd", nullable = false)
    private String password;

    @CsvBindByName(column = "성함", locale = "ko-KR", required = true)
    @Column(name = "name")
    private String name; // 회원의 이름


    @CsvBindByName(column = "전공", locale = "ko-KR")
    @Column(name = "major")
    private int major; // 전공


    @CsvBindByName(column = "휴대폰번호")
    @Column(name = "phn")
    private String phoneNo; // 전화번호

    @Column(name="email")
    private String email;

    @CsvCustomBindByName(column = "등급", converter = AuthStateConverter.class)
    @Column(name = "auth")
    @Enumerated(EnumType.STRING)
    private AuthState authority; // 권한 UNI_STUDENT, POST_STUDENT, PROFESSOR, OFFICE



    @Column(name = "cnt")
    @ColumnDefault("0")
    private int cnt; // 회원 예약 가능 횟수


    @Column(name = "noshow")
    @ColumnDefault("0")
    private int noshow; // 회원 예약 가능 횟수

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Reservation> reservationLogs;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return studentNo;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

