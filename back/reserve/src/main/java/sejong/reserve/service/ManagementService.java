package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Management;
import sejong.reserve.domain.Member;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ManagementService{
    private final ManagementRepository managementRepository;
    private final MemberRepository memberRepository;
//    private final MemberService memberService;

    public Management getManagement() {
        return managementRepository.findOne();
    }

    @Transactional
    public void update(Management managementInfo) {
        managementRepository.update(managementInfo);
    }


    @Transactional
    public void updateCnt(int univ_cnt, int post_cnt, int pro_cnt) {
        managementRepository.updateCnt(univ_cnt, post_cnt, pro_cnt);
    }

    @Transactional
    public void updateGap(int univ_gap, int post_gap, int pro_gap) {
        managementRepository.updateGap(univ_gap, post_gap, pro_gap);
    }

    public int getUnivCnt() {return managementRepository.getUnivCnt();}

    public int getPostCnt() {return managementRepository.getPostCnt();}

    public int getProCnt() {return managementRepository.getProCnt();}

    public int getUnivGap() {return managementRepository.getUnivGap();}

    public int getPostGap() {return managementRepository.getPostGap();}

    public int getProGap() {return managementRepository.getProGap();}

    @Transactional
    public void resetCntAll() {
        List<Member> members = memberRepository.findAll();
        for(Member member:members) {
            int cnt = resetCntEach(member.getStudentNo());
            if(cnt == 0) {
                throw new IllegalStateException("초기화에 실패하였습니다.");
            }
        }
    }

    @Transactional
    public int resetCntEach(String studentNo) {
        String authState = memberRepository.getAuthState(studentNo);
        int cnt = 0;
        switch (authState) {
            case "UNI_STUDENT" :
                cnt = managementRepository.getUnivCnt();
                memberRepository.setCnt(cnt, studentNo);
                break;
            case "POST_STUDENT":
                cnt = managementRepository.getPostCnt();
                memberRepository.setCnt(cnt, studentNo);
                break;
            case "PROFESSOR": case "OFFICE":
                cnt = managementRepository.getProCnt();
                memberRepository.setCnt(cnt, studentNo);
                break;
            default:
        }
        return cnt;
    }



}
