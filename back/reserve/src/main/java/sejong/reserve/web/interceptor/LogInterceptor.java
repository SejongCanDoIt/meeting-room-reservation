package sejong.reserve.web.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Slf4j
public class LogInterceptor implements HandlerInterceptor {

    public static final String LOG_ID = "logId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("---------------------LogInterceptor Start---------------------");

        String requestURI = request.getRequestURI();

        // @RequestMapping -> HandlerMethod
        // 정적 리소스 -> ResourceHttpRequestHandler
//        if(handler instanceof HandlerMethod) {
//            HandlerMethod hm = (HandlerMethod) handler;// 호출할 컨트롤러의 모든 정보가 포함되어 있다.
//        }

        log.info("preHandle REQUEST: requestURI = [{}]",
                requestURI);

//        log.info("preHandle REQUEST: handler = [{}]",
//                handler);

        log.info("---------------------LogInterceptor End---------------------");


        return true;
    }

}
