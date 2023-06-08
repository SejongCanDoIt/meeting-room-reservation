package sejong.reserve.web.argumentresolver;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.service.AdminService;
import sejong.reserve.service.MemberService;

@Slf4j
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {

    private final MemberService memberService;
    private final AdminService adminService;

    public LoginMemberArgumentResolver(MemberService memberService, AdminService adminService) {

        this.memberService = memberService;
        this.adminService = adminService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        log.info("supportsParameter 실행");
        boolean hasLoginAnnotation = parameter.hasParameterAnnotation(Login.class);

        boolean hasMemberType = Member.class.isAssignableFrom(parameter.getParameterType());
        boolean hasAdminType = Admin.class.isAssignableFrom(parameter.getParameterType());

        return hasLoginAnnotation && (hasMemberType || hasAdminType);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        log.info("resolveArgument 실행");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null) {
            Object principal = auth.getPrincipal();

            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();

                // Member나 Admin 타입의 객체를 로드하는 코드를 여기에 추가
                // 예를 들면, 데이터베이스에서 username에 해당하는 Member나 Admin 객체를 찾는 코드 등

                if (username.equals("ADMIN")) {
                    AdminDto adminInfo = adminService.getAdminInfo();
                    return adminInfo;
                } else {
                    Member member = memberService.findByStudentNo(username);
                    return member;
                }
            }
        }

        return null; // Member나 Admin 객체를 찾지 못했을 때는 null 반환
    }
}