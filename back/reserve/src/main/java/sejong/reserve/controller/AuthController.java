package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.LoginDto;
import sejong.reserve.dto.MemberDto;
import sejong.reserve.service.MemberService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor
public class AuthController {
  private final MemberService memberService;

  @PostMapping("login")
  public Boolean login(
          @RequestBody LoginDto loginInfo,
          HttpServletResponse response,
          HttpSession session) throws Exception {
    String student_no = loginInfo.getSno();
    String password = loginInfo.getPassword();

    log.info("login sno = {}, password = {}", student_no, password);

    Member member = memberService.findMemberForLogin(student_no, password);

    if (member != null) {
      session.setAttribute("loginMember", member); // 로그인한 멤버 정보를 세션 보관소에 저장
      MemberDto memberDto = new MemberDto((Member) session.getAttribute("loginMember"));
      log.info("login member = {}", memberDto);
    }

    // 클라이언트에게 쿠키 보내기
    // - 쿠키 데이터는 문자열만 가능
//    Cookie cookie = new Cookie("student_no", student_no); // 클라이언트 쪽에 저장할 쿠키 생성

//    cookie.setPath("/");

//    if (member == null) {
//      cookie.setMaxAge(0); // 클라이언트에게 해당 이름의 쿠키를 지우라고 명령한다.
//    } else {
      // 쿠키의 지속시간을 설정하지 않으면 웹브라우저가 실행되는 동안만 유효하다.
      // 만약 웹브라우저를 종료하더라도 쿠키를 유지하고 싶다면,
      // 지속 시간을 설정해야 한다.
//      cookie.setMaxAge(60 * 60 * 24 * 7);
//    }
//    response.addCookie(cookie);

    if(member != null)
      return true;
    else
      return false;
  }

  @GetMapping("logout")
  public void logout(HttpSession httpSession) throws Exception {
    httpSession.invalidate();
  }

  @GetMapping("checkLogin")
  public boolean checkLogin(HttpSession session) throws Exception {
    log.info("checkLogin-test");
    Member member = (Member) session.getAttribute("loginMember");
    log.info("member = {}", member);
    if(member == null) {
      return false;
    } else {
      return true;
    }
  }
}
