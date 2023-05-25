package sejong.reserve.web.function;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sejong.reserve.domain.Member;
import sejong.reserve.domain.Reservation;
import sejong.reserve.domain.ReservationStatus;
import sejong.reserve.dto.ReservationsDto;
import sejong.reserve.service.ManagementService;
import sejong.reserve.service.MemberService;
import sejong.reserve.service.ReservationService;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class SchedulerFunction {
    private final ManagementService managementService;
    private final MemberService memberService;
    private final ReservationService reservationService;

    @Scheduled(cron = "0 0 0 1 * ?", zone="Asia/Seoul") // 매달 1일 0시 0분에 실행
    public void resetCntValue() {
        managementService.resetCntAll();

        log.info("CNT scheduling batch = {}", LocalDateTime.now());
        List<Member> members = memberService.findAll();
        for(Member member: members) {
            log.info("member = {}, cnt = {}", member.getName(), member.getCnt());
        }
    }

    @Scheduled(cron = "0 * * * * ?") // 매분 확인
    public void resetReservationStatus() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayStartDateTime = LocalDateTime.of(now.getYear(), now.getMonth().minus(1), now.getDayOfMonth(), now.getHour(), 0, 0);

        // 현재 시각 한시간 전부터 현재 시각까지의 예약 리스트에서 예약 상태인 것만 가져오기
        List<ReservationsDto> reservationsDtoList = reservationService.getReservationListByDateAndStatus(todayStartDateTime, now, ReservationStatus.RESERVED);
        for(ReservationsDto reservationsDto: reservationsDtoList) {
            if(reservationsDto.getEnd().isBefore(now)) {
                Long reservation_id = reservationsDto.getReservation_id();
                reservationService.setStatus(ReservationStatus.FINISHED, reservation_id);
            }
        }
    }

    @Scheduled(cron = "0 * * * * ?") // 매분 확인
    public void noShowCheck() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayDate = LocalDateTime.of(now.getYear(), now.getMonth().minus(1).getValue(), now.getDayOfMonth(), 0, 0, 0);
        LocalDateTime nextDate = LocalDateTime.of(now.getYear(), now.getMonth().getValue(), now.plusDays(1).getDayOfMonth(), 0, 0, 0);

        // 현재 시각 한시간 전부터 현재 시각까지의 예약 리스트에서 예약이 끝난 상태인 것만 가져오기
        List<ReservationsDto> reservationsDtoList = reservationService.getReservationListByDateAndStatus(todayDate, nextDate, ReservationStatus.FINISHED);
        for(ReservationsDto reservationsDto: reservationsDtoList) {
            if(reservationsDto.getNoShowCheck() == false) { // 예약이 끝난 시간까지 노쇼가 안되어 있을 경우
                memberService.addNoShowCnt(reservationsDto.getMember_sno());
                log.info("member 의 noshow 개수 증가여부 = {}", memberService.findByStudentNo(reservationsDto.getMember_sno()).getNoshow());
                reservationService.setNoShowStatus(reservationsDto.getReservation_id());
            }
        }
    }

}
