package sejong.reserve.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.input.BOMInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.MemberDto;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;
import sejong.reserve.repository.ReservationRepository;
import sejong.reserve.web.exception.NotEnoughCntException;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {
    private final ReservationRepository reservationRepository;

    private final MemberRepository memberRepository;
    private final ManagementRepository managementRepository;

    public void saveMembers(List<Member> members){
        log.info("멤버 저장 실행");
        members.forEach(member-> {
            memberRepository.save(member);
        });
    }

    public Long join(Member member){
        memberRepository.save(member);
        return member.getId();
    }



    public Member findByStudentNo(String studentNo){
        return memberRepository.findByStudentNo(studentNo);
    }

    public List<Member> findAll(){
        return memberRepository.findAll();
    }

    public void deleteByStudentNo(String studentNo){
        Member member = memberRepository.findByStudentNo(studentNo);
        if (member != null) {
            memberRepository.delete(member);
        }
    }

    public void updatePasswordByStudentNo(String studentNo, String newPassword){
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setPassword(newPassword);
    }

    public String findPhoneNoByStudentNo(String studentNo) {
        return memberRepository.findPhoneNoByStudentNo(studentNo);
    }
    public void resetPassword(String studentNo) {
        String last4DigitsOfPhone = memberRepository.findPhoneNoByStudentNo(studentNo);
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setPassword(last4DigitsOfPhone);
    }
    public Member addNewMember(Member member) {
        return memberRepository.save(member);
    }

    public Member findMemberForLogin(String studentNo, String password) {
        return memberRepository.findMemberForLogin(studentNo, password);
    }
    public void saveMembersFromCsv(MultipartFile file) throws IOException {
        String encoding = "UTF-8"; // 인코딩이 필요하다면 여기서 변경하세요.

        try (Reader reader = new InputStreamReader(new BOMInputStream(file.getInputStream()), encoding)) {
            CsvToBean<Member> csvToBean = new CsvToBeanBuilder<Member>(reader)
                    .withType(Member.class)
                    .build();

            List<Member> members = csvToBean.parse();

            // 로그 추가
            log.info("CSV 파일에서 읽은 멤버 데이터:");
            for (Member member : members) {
                log.info(member.toString());
            }
            saveMembers(members);
        }
    }

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

    public void addCnt(Long member_id) {
        Optional<Member> memberById = memberRepository.findById(member_id);
        Member member = memberById.get();
        int cnt = member.getCnt();
        member.setCnt(cnt++);
    }

    public List<MemberDto> findMemberBySnoOrName(String q) {
        List<Member> memberBySnoOrName = memberRepository.findMemberBySnoOrName(q);
        List<MemberDto> memberDtoList = convertMemberToMemberDtoList(memberBySnoOrName);
        return memberDtoList;
    }

    private static List<MemberDto> convertMemberToMemberDtoList(List<Member> memberList) {
        List<MemberDto> memberDtoList = memberList.stream()
                .map(m -> new MemberDto(m))
                .collect(Collectors.toList());
        return memberDtoList;
    }

    public List<MemberDto> findMemberByNoShow(int noShowCnt) {
        List<Member> memberByNoShow = memberRepository.findMemberByNoShow(noShowCnt);
        List<MemberDto> memberDtoList = convertMemberToMemberDtoList(memberByNoShow);
        return memberDtoList;
    }

    public void resetNoShowCntBySNo(String studentNo) {
        Member member = memberRepository.findByStudentNo(studentNo);
        member.setNoshow(0);
    }

    public void resetNoShowCntAll() {
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            member.setNoshow(0);
        }
    }


    @Transactional
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

}
