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
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;
import sejong.reserve.repository.ReservationRepository;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

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
        memberRepository.updatePasswordByStudentNo(studentNo,newPassword);
    }

    public String findPhoneNoByStudentNo(String studentNo) {
        return memberRepository.findPhoneNoByStudentNo(studentNo);
    }
    public void resetPassword(String studentNo) {
        String last4DigitsOfPhone = memberRepository.findPhoneNoByStudentNo(studentNo);
        memberRepository.updatePasswordByStudentNo(studentNo, last4DigitsOfPhone);
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

}
