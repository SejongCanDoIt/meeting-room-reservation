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

    public Management getManagement() {
        return managementRepository.findOne();
    }

    @Transactional
    public void update(Management managementInfo) {
        Management management = managementRepository.findOne();
        management.setManagement(managementInfo, management);
    }


    @Transactional
    public void updateCnt(int univ_cnt, int post_cnt, int pro_cnt) {
        Management management = managementRepository.findOne();
        management.setUniv_cnt(univ_cnt);
        management.setPost_cnt(post_cnt);
        management.setPro_cnt(pro_cnt);
    }

    @Transactional
    public void updateTimeGap(int univ_gap, int post_gap, int pro_gap) {
        Management management = managementRepository.findOne();
        management.setUniv_time_gap(univ_gap);
        management.setPost_time_gap(post_gap);
        management.setPro_time_gap(pro_gap);
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
        Member member = memberRepository.findByStudentNo(studentNo);
        switch (authState) {
            case "UNI_STUDENT" :
                cnt = managementRepository.getUnivCnt();
                member.setCnt(cnt);
                break;
            case "POST_STUDENT":
                cnt = managementRepository.getPostCnt();
                member.setCnt(cnt);
                break;
            case "PROFESSOR": case "OFFICE":
                cnt = managementRepository.getProCnt();
                member.setCnt(cnt);
                break;
            default:
        }
        return cnt;
    }



}
