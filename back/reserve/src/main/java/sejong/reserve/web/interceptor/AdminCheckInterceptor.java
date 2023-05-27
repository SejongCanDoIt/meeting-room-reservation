package sejong.reserve.web.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.web.SessionConst;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
public class AdminCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        log.info("관리자 인증 실행 = {}", requestURI);

        HttpSession session = request.getSession();

        if(session instanceof AdminDto){
            AdminDto admin = (AdminDto) session.getAttribute(SessionConst.LOGIN_MEMBER);
            if(!admin.getLoginId().equals(SessionConst.ADMIN_MEMBER)) {
                log.info("미인증 관리자 사용자 요청");
                log.info("요청 user ID = {}", admin.getLoginId());
                log.info("관리자 ID = {}", SessionConst.ADMIN_MEMBER);
                response.sendError(HttpStatus.UNAUTHORIZED.value());
                return false;
            }
        } else if(session instanceof Member){
            if(session == null || session.getAttribute(SessionConst.LOGIN_MEMBER) == null) {
                log.info("관리자가 아닌 사용자의 관리자 요청");
                response.sendError(HttpStatus.UNAUTHORIZED.value());
                return false;
            }
        }

        return true;
    }


}
