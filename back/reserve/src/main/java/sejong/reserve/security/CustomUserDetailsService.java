package sejong.reserve.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.repository.AdminRepository;
import sejong.reserve.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String studentNo) throws UsernameNotFoundException {
        return memberRepository.findByMemberIdOp(studentNo)
                .map(this::createUserDetails)
                .orElseGet(() ->
                        adminRepository.findByAdminId(studentNo)
                                .map(this::createAdminDetails)
                                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."))
                );
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(Member member) {
        return User.builder()
                .username(member.getUsername())
                .password(passwordEncoder.encode(member.getPassword()))
                .roles("USER") // role을 "USER"로 설정
                .build();
    }

    // Admin에 대한 UserDetails 객체를 만들어서 리턴
    private UserDetails createAdminDetails(Admin admin) {
        return User.builder()
                .username(admin.getLoginId())
                .password(passwordEncoder.encode(admin.getPassword()))
                .roles("ADMIN") // role을 "ADMIN"로 설정
                .build();
    }
}
