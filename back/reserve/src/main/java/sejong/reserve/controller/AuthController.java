package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.dto.LoginDto;
import sejong.reserve.security.TokenInfo;
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
  public TokenInfo login(@RequestBody LoginDto memberLoginRequestDto) {
    log.info("login info: = {}", memberLoginRequestDto);
    String memberId = memberLoginRequestDto.getSno();
    String password = memberLoginRequestDto.getPassword();
    TokenInfo tokenInfo = memberService.login(memberId, password);
    return tokenInfo;
  }

//  @PostMapping("/login")
  public ResponseEntity<?> loginOld(
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
  public ResponseEntity<String> checkLogin() throws Exception {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    log.info("Authentication: {}", authentication); // 추가된 코드


    log.info("checkLogin 1 = {}", authentication);
    if(authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken){
      throw new NotLoginException("로그인이 되어 있지 않은 상태 입니다!");
    }
    if (!(authentication.getPrincipal() instanceof UserDetails)) {
      throw new NotLoginException("로그인이 되어 있지 않은 상태 입니다!");
    }

    log.info("checkLogin 2");

    // "USER" 또는 "ADMIN"을 반환
    String role = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .findFirst()
            .orElseThrow(() -> new NotLoginException("로그인이 되어 있지 않은 상태 입니다!"));

    String username = authentication.getName(); // 로그인한 사용자의 ID 가져오기
    log.info("checkLogin: {}", username);

    if(role.equals("ROLE_ADMIN")) {
      log.info("admin login success");
      return new ResponseEntity<>(username, HttpStatus.OK);
    } else if(role.equals("ROLE_USER")) {
      log.info("member login success");
      return new ResponseEntity<>(username, HttpStatus.OK);
    } else{
      throw new NotLoginException("로그인이 되어 있지 않은 상태 입니다!");
    }
  }



}
