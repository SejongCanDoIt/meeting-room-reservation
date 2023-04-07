package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Management;
import sejong.reserve.repository.ManagementRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ManagementService{
    private final ManagementRepository managementRepository;

    public List<Management> list() {
        List<Management> managements = managementRepository.findAll();
        return managements;
    }

    public Management detail(Long id) {
        return managementRepository.findById(id);
    }


    @Transactional
    public void update(Management managementInfo) {
        managementRepository.update(managementInfo);
    }


    @Transactional
    public void delete(Long managementId) {
        managementRepository.delete(managementId);
    }

    public int getUnivCnt() {return managementRepository.getUnivCnt();}

    public int getPostCnt() {return managementRepository.getPostCnt();}

    public int getProCnt() {return managementRepository.getProCnt();}

    public int getUnivGap() {return managementRepository.getUnivGap();}

    public int getPostGap() {return managementRepository.getPostGap();}

    public int getProGap() {return managementRepository.getProGap();}


}
