package sejong.reserve.service;
// 필요한 패키지들을 import
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.dto.ManagementDto;
import sejong.reserve.repository.ManagementRepository;
import sejong.reserve.repository.MemberRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

// @RequiredArgsConstructor는 final이나 @NonNull 필드만 파라미터로 받는 생성자를 만들어주는 롬복 어노테이션입니다.
// @Service는 스프링 컨텍스트에서 해당 클래스의 관리를 담당하게 만드는 스프링 어노테이션입니다.
@RequiredArgsConstructor
@Service
public class ExcelService {
    private final MemberRepository memberRepository; // Spring Data JPA를 이용하여 정의한 Repository

    private final ManagementRepository managementRepository;

    // JPA EntityManager를 이용하여 DB와 상호작용. @PersistenceContext는 엔티티 매니저를 자동으로 주입해주는 스프링 어노테이션
    @PersistenceContext
    private EntityManager entityManager;

    // DB의 AUTO_INCREMENT 값을 1로 재설정하는 메소드
    @Transactional
    public void resetAutoIncrement() {
        // Native SQL 쿼리를 이용하여 AUTO_INCREMENT를 1로 재설정
        entityManager.createNativeQuery("ALTER TABLE member AUTO_INCREMENT = 1").executeUpdate();
    }


    // 엑셀 파일에서 데이터를 가져와 DB에 저장하는 메소드
    @Transactional
    public void importExcelFile(InputStream in) {
        memberRepository.deleteAll(); // 현재 DB의 모든 멤버 데이터를 삭제
        resetAutoIncrement(); // AUTO_INCREMENT 값을 재설정

        // try-with-resources 구문을 이용하여 엑셀 파일을 열고 작업 후 자동으로 닫음
        try (Workbook workbook = new XSSFWorkbook(in)) {
            Sheet sheet = workbook.getSheetAt(0); // 첫 번째 시트를 가져옴
            Iterator<Row> rows = sheet.iterator(); // 각 행에 대한 iterator를 생성
            if (!rows.hasNext()) return; // 행이 없으면 메소드 종료

            Map<String, Integer> headerMap = new HashMap<>(); // 엑셀 파일의 헤더와 그에 해당하는 인덱스를 저장할 맵
            Row headerRow = rows.next(); // 첫 번째 행은 헤더이므로 따로 저장
            for (Cell cell : headerRow) {
                headerMap.put(cell.getStringCellValue(), cell.getColumnIndex()); // 각 헤더 셀의 값과 그에 해당하는 인덱스를 맵에 저장
            }

            // 남은 행들에 대하여 반복
            while (rows.hasNext()) {
                Row currentRow = rows.next(); // 현재 행을 가져옴
                if (isRowEmpty(currentRow)) continue; // 행이 비어있으면 다음 행으로 넘어감

                Member member = new Member(); // 새로운 멤버 객체 생성
                // 각 멤버의 필드를 셀의 값에 따라 설정
                member.setStudentNo(getCellValueAsString(currentRow.getCell(headerMap.get("ID"))));
                member.setPassword(getCellValueAsString(currentRow.getCell(headerMap.get("PASS"))));
                member.setName(getCellValueAsString(currentRow.getCell(headerMap.get("Name"))));
                member.setMajor(getCellValueAsInt(currentRow.getCell(headerMap.get("Dept."))));
                member.setPhoneNo(getCellValueAsString(currentRow.getCell(headerMap.get("Phone"))));
                member.setEmail(getCellValueAsString(currentRow.getCell(headerMap.get("email"))));

                // "Type" 셀의 값에 따라 권한 설정
                String typeValue = getCellValueAsString(currentRow.getCell(headerMap.get("Type")));
                switch (typeValue) {
                    case "1":
                        member.setAuthority(AuthState.OFFICE);
                        member.setCnt(managementRepository.getOfficeCnt());
                        break;
                    case "2":
                        member.setAuthority(AuthState.PROFESSOR);
                        member.setCnt(managementRepository.getProCnt());
                        break;
                    case "3":
                        member.setAuthority(AuthState.POST_STUDENT);
                        member.setCnt(managementRepository.getPostCnt());
                        break;
                    case "4":
                        member.setAuthority(AuthState.UNI_STUDENT);
                        member.setCnt(managementRepository.getUnivCnt());
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid Type value: " + typeValue);
                }

                member.setNoshow(getCellValueAsInt(currentRow.getCell(headerMap.get("NoShow"))));

                memberRepository.save(member); // 멤버 객체를 DB에 저장
            }
        } catch (IOException e) {
            e.printStackTrace(); // 파일 입출력 에러 발생 시 에러 메시지를 출력
        }
    }

    // 행이 비어있는지 확인하는 메소드
    private boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            // 셀이 null이 아니고, 셀의 타입이 BLANK가 아니면 false 반환
            if (cell != null && cell.getCellType() != CellType.BLANK)
                return false;
        }
        return true; // 모든 셀이 비어있으면 true 반환
    }

    // 셀의 값을 문자열로 반환하는 메소드
    private String getCellValueAsString(Cell cell) {
        if (cell == null)
            return null;

        CellType cellType = cell.getCellType();
        if (cellType == CellType.STRING) {
            return cell.getStringCellValue();
        } else if (cellType == CellType.NUMERIC || cellType == CellType.FORMULA) {
            cell.setCellType(CellType.STRING); // 숫자 혹은 수식 셀을 문자열 셀로 변환
            return cell.getStringCellValue();
        } else {
            return null;
        }
    }

    // 셀의 값을 int로 반환하는 메소드
    private int getCellValueAsInt(Cell cell) {
        String cellValue = getCellValueAsString(cell);
        if (cellValue == null)
            return 0;
        return Integer.parseInt(cellValue);
    }

}
