package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.LoginDto;
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
      Member sessionMember = (Member) session.getAttribute("loginMember");
      log.info("login member = {}", sessionMember);
    }

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
