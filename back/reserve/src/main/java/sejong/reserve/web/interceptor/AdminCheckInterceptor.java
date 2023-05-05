package sejong.reserve.web.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import sejong.reserve.web.SessionConst;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
public class AdminCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        log.info("AdminCheckInterceptor 실행 = {}", requestURI);

        HttpSession session = request.getSession();

        if(session.getAttribute(SessionConst.LOGIN_MEMBER) != SessionConst.ADMIN_MEMBER) {
            log.info("미인증 관리자 사용자 요청");
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            return false;
        }
        return true;
    }


}
