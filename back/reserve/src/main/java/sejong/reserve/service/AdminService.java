package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Admin;
import sejong.reserve.domain.Notice;
import sejong.reserve.dto.AdminDto;
import sejong.reserve.dto.CreateRequestNoticeDto;
import sejong.reserve.dto.UpdateAdminDto;
import sejong.reserve.dto.UpdateRequestNoticeDto;
import sejong.reserve.repository.AdminRepository;
import sejong.reserve.repository.NoticeRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {
    private final AdminRepository adminRepository;


    /**
     * 관리자 정보 조회
     */
    public AdminDto getAdminInfo() {
        List<Admin> admins = adminRepository.findAll();
        AdminDto admin = new AdminDto(admins.get(0));
        return admin;
    }


    /**
     * 관리자 정보 수정
     */
    @Transactional
    public void update(UpdateAdminDto updateAdminInfo) {
        Admin admin = adminRepository.findAll().get(0);
        admin.setEmail(updateAdminInfo.getEmail());
        admin.setPhoneNo(updateAdminInfo.getPhoneNo());
        admin.setPassword(updateAdminInfo.getPassword());
    }


    public AdminDto findAdminForLogin(String loginId, String password) {
        Admin admin = adminRepository.findAll().get(0);
        AdminDto adminDto = new AdminDto(admin);

        if(admin.getLoginId().equals(loginId) && admin.getPassword().equals(password)) {
            return adminDto;
        } else {
            return null;
        }
    }
}
