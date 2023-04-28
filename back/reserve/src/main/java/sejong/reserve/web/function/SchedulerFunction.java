package sejong.reserve.web.function;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sejong.reserve.service.ManagementService;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class SchedulerFunction {
    private final ManagementService managementService;

    @Scheduled(cron = "0 0 0 1 * ?", zone="Asia/Seoul") // 매달 1일 0시 0분에 실행
    public void resetValue() {
        managementService.resetCntAll();

        log.info("CNT scheduling batch = {}", LocalDateTime.now());
    }

//    @Scheduled(initialDelay = 10000, fixedDelay = 10000)
//    public void runAfterTenSecondsRepeatTenSeconds() {
//        log.info("10초 후 실행 => time : " + LocalTime.now());
//    }
}
