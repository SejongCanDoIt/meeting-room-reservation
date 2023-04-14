package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;
import sejong.reserve.repository.ReservationRepository;

import javax.persistence.EntityManager;
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

}
