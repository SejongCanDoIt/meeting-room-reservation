package sejong.reserve.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Member;
import sejong.reserve.service.MemberService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private  MemberService memberService;

    @GetMapping("/list")
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberService.findAll();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/{sno}")
    public ResponseEntity<Member> getMemberBySno(@PathVariable("sno") String studentNo) {
        Member member = memberService.findByStudentNo(studentNo);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{sno}")
    public ResponseEntity<Void> deleteMemberBySno(@PathVariable("sno") String studentNo) {
        memberService.deleteByStudentNo(studentNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find-phone/{sno}")
    public ResponseEntity<String> getPhoneNoBySno(@PathVariable("sno") String studentNo) {
        String phoneNo = memberService.findPhoneNoByStudentNo(studentNo);
        return new ResponseEntity<>(phoneNo, HttpStatus.OK);
    }

    @PutMapping("/set-password/{sno}")
    public ResponseEntity<Void> setPasswordBySno(@PathVariable("sno") String studentNo) {
        String newPassword = memberService.findPhoneNoByStudentNo(studentNo);
        memberService.updatePasswordByStudentNo(studentNo, newPassword);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update-pwd/{sno}")
    public ResponseEntity<Void> updatePasswordBySno(@PathVariable("sno") String studentNo, @RequestParam("newPassword") String newPassword) {
        memberService.updatePasswordByStudentNo(studentNo, newPassword);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/set-password/{sno}")
    public ResponseEntity<?> resetPassword(@PathVariable("sno") String studentNo) {
        memberService.resetPassword(studentNo);
        return ok("비밀번호 초기화 성공");
    }

    @PostMapping("/insert")
    public ResponseEntity<Long> insertMember(@RequestBody Member member) {
        Long memberId = memberService.join(member);
        return new ResponseEntity<>(memberId, HttpStatus.CREATED);
    }


    @PostMapping("/fake")
    public void fake(){

    }

}
