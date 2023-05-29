package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.dto.LoginDto;
import sejong.reserve.service.AdminService;
import sejong.reserve.service.MemberService;
import sejong.reserve.web.SessionConst;
import sejong.reserve.web.exception.NotLoginException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
  private final MemberService memberService;
  private final AdminService adminService;

  @PostMapping("/login")
  public ResponseEntity<?> login(
          @RequestBody LoginDto loginInfo,
          HttpServletResponse response,
          HttpSession session) throws Exception {
    String loginId = loginInfo.getSno();
    String password = loginInfo.getPassword();

    log.info("login loginId = {}, password = {}", loginId, password);

    if(loginId.equals(SessionConst.ADMIN_MEMBER)) { //
      log.info("관리자 로그인 시도"); // 관리자 로그인인 경우
      AdminDto admin = adminService.findAdminForLogin(loginId, password);
      log.info("admin = {}", admin);
      if(admin != null) {
        session.setAttribute(SessionConst.LOGIN_MEMBER, admin);
        return ResponseEntity.ok().build();
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or password is incorrect");
      }
    }


    // 일반 사용자 로그인인 경우
    Member member = memberService.findMemberForLogin(loginId, password);


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

  @GetMapping("/logout")
  public ResponseEntity<?> logout(HttpSession httpSession) throws Exception {
    httpSession.invalidate();
    return ResponseEntity.ok().build();
  }

  @GetMapping("/checkLogin")
  public ResponseEntity<String> checkLogin(HttpSession session) throws Exception {
    log.info("checkLogin-test");

    if (session instanceof AdminDto) {
      AdminDto admin = (AdminDto) session.getAttribute(SessionConst.LOGIN_MEMBER);
      if (admin == null) {
        throw new NotLoginException("로그인이 되어 있지 않은 상태 입니다!");
      } else {
        return new ResponseEntity<>(admin.getLoginId(), HttpStatus.OK);
      }
    } else if (session instanceof Member) {
      Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
      if (member == null) {
        throw new NotLoginException("로그인이 되어 있지 않은 상태 입니다!");
      } else {
        return new ResponseEntity<>(member.getStudentNo(), HttpStatus.OK);
      }
    }


    return null;
  }


}
