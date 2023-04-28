package sejong.reserve.web.function;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sejong.reserve.domain.Member;
import sejong.reserve.service.ManagementService;
import sejong.reserve.service.MemberService;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class SchedulerFunction {
    private final ManagementService managementService;
    private final MemberService memberService;

//    @Scheduled(cron = "0 0 0 1 * ?", zone="Asia/Seoul") // 매달 1일 0시 0분에 실행
    @Scheduled(cron = "0 11 23 * * *", zone="Asia/Seoul") // 매일 11시에 실행
    public void resetValue() {
        managementService.resetCntAll();

        log.info("CNT scheduling batch = {}", LocalDateTime.now());
        List<Member> members = memberService.findAll();
        for(Member member: members) {
            log.info("member = {}, cnt = {}", member.getName(), member.getCnt());
        }
    }

//    @Scheduled(initialDelay = 10000, fixedDelay = 10000)
//    public void runAfterTenSecondsRepeatTenSeconds() {
//        log.info("10초 후 실행 => time : " + LocalTime.now());
//    }
}
