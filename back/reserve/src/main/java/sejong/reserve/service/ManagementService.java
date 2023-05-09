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
    public void updateCnt(int univ_cnt, int post_cnt, int pro_cnt, int office_cnt) {
        Management management = managementRepository.findOne();
        management.setUniv_cnt(univ_cnt);
        management.setPost_cnt(post_cnt);
        management.setPro_cnt(pro_cnt);
        management.setOffice_cnt(office_cnt);
    }

    @Transactional
    public void updateTimeGap(int univ_gap, int post_gap, int office_gap, int pro_gap) {
        Management management = managementRepository.findOne();
        management.setUniv_hour_gap(univ_gap);
        management.setPost_hour_gap(post_gap);
        management.setOffice_hour_gap(office_gap);
        management.setPro_hour_gap(pro_gap);
    }

    @Transactional
    public void updatePossibleGap(int univ_gap, int post_gap, int office_gap, int pro_gap) {
        Management management = managementRepository.findOne();
        management.setUniv_week_gap(univ_gap);
        management.setPost_week_gap(post_gap);
        management.setOffice_week_gap(office_gap);
        management.setPro_week_gap(pro_gap);
    }

    public int getUnivCnt() {return managementRepository.getUnivCnt();}

    public int getPostCnt() {return managementRepository.getPostCnt();}

    public int getProCnt() {return managementRepository.getProCnt();}

    public int getUnivHourGap() {return managementRepository.getUnivHourGap();}

    public int getPostHourGap() {return managementRepository.getPostHourGap();}

    public int getOfficeHourGap() {return managementRepository.getOfficeHourGap();}
    public int getProHourGap() {return managementRepository.getProHourGap();}

    public int getUnivWeekGap() {return managementRepository.getUnivWeekGap();}

    public int getPostWeekGap() {return managementRepository.getPostWeekGap();}

    public int getOfficeWeekGap() {return managementRepository.getOfficeWeekGap();}
    public int getProWeekGap() {return managementRepository.getProWeekGap();}

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
            case "PROFESSOR":
                cnt = managementRepository.getProCnt();
                member.setCnt(cnt);
                break;
            case "OFFICE":
                cnt = managementRepository.getOfficeCnt();
                member.setCnt(cnt);
                break;
            default:
        }
        return cnt;
    }



}
