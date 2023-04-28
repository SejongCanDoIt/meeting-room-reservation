package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.LoginDto;
import sejong.reserve.service.MemberService;
import sejong.reserve.web.SessionConst;

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
  public ResponseEntity<?> login(
          @RequestBody LoginDto loginInfo,
          HttpServletResponse response,
          HttpSession session) throws Exception {
    String student_no = loginInfo.getSno();
    String password = loginInfo.getPassword();

    log.info("login sno = {}, password = {}", student_no, password);

    Member member = memberService.findMemberForLogin(student_no, password);


    if (member != null) {
      session.setAttribute(SessionConst.LOGIN_MEMBER, member); // 로그인한 멤버 정보를 세션 보관소에 저장
      Member sessionMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
      log.info("login member = {}", sessionMember);
    }

    if(member != null) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or password is incorrect");
    }
  }

  @GetMapping("logout")
  public ResponseEntity<?> logout(HttpSession httpSession) throws Exception {
    httpSession.invalidate();
    return ResponseEntity.ok().build();
  }

  @GetMapping("checkLogin")
  public boolean checkLogin(HttpSession session) throws Exception {
    log.info("checkLogin-test");
    Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
    log.info("member = {}", member);
    if(member == null) {
      return false;
    } else {
      return true;
    }
  }
}
