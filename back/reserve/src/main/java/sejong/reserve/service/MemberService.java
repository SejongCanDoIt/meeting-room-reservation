package sejong.reserve.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.input.BOMInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.MemberDto;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;
import sejong.reserve.repository.ReservationRepository;
import sejong.reserve.security.JwtTokenProvider;
import sejong.reserve.security.TokenInfo;
import sejong.reserve.web.exception.NotEnoughCntException;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service // 서비스 계층의 컴포넌트를 나타내는 스프링 어노테이션
@RequiredArgsConstructor // 필수 생성자를 자동으로 생성하는 롬복 어노테이션
@Transactional // 트랜잭션을 적용하는 스프링 어노테이션
@Slf4j // 로깅을 위한 롬복 어노테이션
public class MemberService {
    private final ReservationRepository reservationRepository;

    private final MemberRepository memberRepository;
    private final ManagementRepository managementRepository;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    // 주어진 멤버 리스트를 저장하는 메소드
    public void saveMembers(List<Member> members){
        log.info("멤버 저장 실행");
        members.forEach(member-> {
            memberRepository.save(member);
        });
    }

    // 멤버를 저장하고 그 멤버의 ID를 반환하는 메소드
    public Long join(Member member){
        memberRepository.save(member);
        return member.getId();
    }

    // 학번에 해당하는 멤버를 찾는 메소드
    public Member findByStudentNo(String studentNo){
        return memberRepository.findByStudentNo(studentNo);
    }

    // 모든 멤버를 찾는 메소드
    public List<Member> findAll(){
        return memberRepository.findAll();
    }

    // 학번에 해당하는 멤버를 삭제하는 메소드
    public void deleteByStudentNo(String studentNo){
        Member member = memberRepository.findByStudentNo(studentNo);
        if (member != null) {
            memberRepository.delete(member);
        }
    }

    // 학번에 해당하는 멤버의 비밀번호를 업데이트하는 메소드
    public void updatePasswordByStudentNo(String studentNo, String newPassword){
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setPassword(newPassword);
    }

    // 학번에 해당하는 멤버의 전화번호를 찾는 메소드
    public String findPhoneNoByStudentNo(String studentNo) {
        return memberRepository.findPhoneNoByStudentNo(studentNo);
    }

    // 학번에 해당하는 멤버의 비밀번호를 그 멤버의 전화번호로 리셋하는 메소드
    public void resetPassword(String studentNo) {
        String last4DigitsOfPhone = memberRepository.findPhoneNoByStudentNo(studentNo);
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setPassword(last4DigitsOfPhone);
    }

    // 새 멤버를 추가하는 메소드
    public Member addNewMember(Member member) {
        return memberRepository.save(member);
    }

    // 로그인을 위해 학번과 비밀번호에 해당하는 멤버를 찾는 메소드
    public Member findMemberForLogin(String studentNo, String password) {
        return memberRepository.findMemberForLogin(studentNo, password);
    }

    // CSV 파일로부터 멤버 정보를 읽어와 저장하는 메소드
    public void saveMembersFromCsv(MultipartFile file) throws IOException {
        String encoding = "UTF-8";

        try (Reader reader = new InputStreamReader(new BOMInputStream(file.getInputStream()), encoding)) {
            CsvToBean<Member> csvToBean = new CsvToBeanBuilder<Member>(reader)
                    .withType(Member.class)
                    .build();

            List<Member> members = csvToBean.parse();

            log.info("CSV 파일에서 읽은 멤버 데이터:");
            for (Member member : members) {
                log.info(member.toString());
            }
            saveMembers(members);
        }
    }

    // 멤버의 예약 가능 횟수를 감소시키는 메소드
    public void removeCnt(Long member_id) {
        Optional<Member> memberById = memberRepository.findById(member_id);
        Member member = memberById.get();
        int cnt = member.getCnt();
        cnt--;
        if (cnt < 0) {
            throw new NotEnoughCntException("No more chance to reserve");
        }
        member.setCnt(cnt);
    }

    // 멤버의 예약 가능 횟수를 증가시키는 메소드
    public void addCnt(Long member_id) {
        Optional<Member> memberById = memberRepository.findById(member_id);
        Member member = memberById.get();
        int cnt = member.getCnt();
        member.setCnt(cnt++);
    }

    // 학번 혹은 이름으로 멤버를 찾는 메소드
    public List<MemberDto> findMemberBySnoOrName(String q) {
        List<Member> memberBySnoOrName = memberRepository.findMemberBySnoOrName(q);
        List<MemberDto> memberDtoList = convertMemberToMemberDtoList(memberBySnoOrName);
        return memberDtoList;
    }

    // 멤버 리스트를 멤버 DTO 리스트로 변환하는 메소드
    private static List<MemberDto> convertMemberToMemberDtoList(List<Member> memberList) {
        List<MemberDto> memberDtoList = memberList.stream()
                .map(m -> new MemberDto(m))
                .collect(Collectors.toList());
        return memberDtoList;
    }

    // 노쇼 횟수에 따른 멤버를 찾는 메소드
    public List<MemberDto> findMemberByNoShow(int noShowCnt) {
        List<Member> memberByNoShow = memberRepository.findMemberByNoShow(noShowCnt);
        List<MemberDto> memberDtoList = convertMemberToMemberDtoList(memberByNoShow);
        return memberDtoList;
    }

    // 학번에 해당하는 멤버의 노쇼 횟수를 리셋하는 메소드
    public void resetNoShowCntBySNo(String studentNo) {
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setNoshow(0);
    }

    // 모든 멤버의 노쇼 횟수를 리셋하는 메소드
    public void resetNoShowCntAll() {
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            member.setNoshow(0);
        }
    }


    // 학번에 해당하는 멤버의 노쇼 횟수를 1 증가시키는 메소드
    public Integer addNoShowCnt(String studentNo) {
        Member member = memberRepository.findByStudentNo(studentNo);
        int noShowCnt = member.getNoshow();
        member.setNoshow(noShowCnt+1);
        return member.getNoshow();
    }

    // 해당 학번 멤버의 노쇼 횟수 얻기
    public Integer getNoShowCnt(String studentNo) {
        Member member = memberRepository.findByStudentNo(studentNo);
        return member.getNoshow();
    }

    // 해당 권한의 멤버들 반환
    public List<MemberDto> findMemberByAuthState(AuthState authority) {
        List<Member> memberList = memberRepository.findMemberByAuthState(authority);
        List<MemberDto> memberDtoList = convertMemberToMemberDtoList(memberList);
        return memberDtoList;
    }

    // 권한별 노쇼 횟수 반환
    public Integer getNoShowCntByState(AuthState authority) {
        Integer sumOfNoShowCnt = memberRepository.sumOfNoShowCntByAuthState(authority);
        return sumOfNoShowCnt;
    }

    // 전체 노쇼 횟수 반환
    public Integer sumOfNoShowCntAll() {
        Integer sumOfNoShowCnt = memberRepository.sumOfNoShowCntAll();
        return sumOfNoShowCnt;
    }

    @Transactional
    public TokenInfo login(String studentNo, String password) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(studentNo, password);
        log.info("TokenInfo  authenticationToken = {}", authenticationToken);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("TokenInfo  authentication = {}", authentication);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
        log.info("TokenInfo  tokenInfo = {}", tokenInfo);

        return tokenInfo;
    }



}
