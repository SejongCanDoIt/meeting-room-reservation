package sejong.reserve.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.repository.MemberRepository;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ExcelService {

    private MemberRepository memberRepository;

    @Transactional
    public void importExcelFile(InputStream in) {
        try (Workbook workbook = new XSSFWorkbook(in)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            if (!rows.hasNext()) return; // if there are no rows, return

            Map<String, Integer> headerMap = new HashMap<>(); // map column label to index
            Row headerRow = rows.next(); // first row is header
            for (Cell cell : headerRow) {
                headerMap.put(cell.getStringCellValue(), cell.getColumnIndex());
            }

            while (rows.hasNext()) {
                Row currentRow = rows.next();
                if (isRowEmpty(currentRow)) continue; // skip empty rows

                Member member = new Member();
                member.setStudentNo(String.valueOf((long) currentRow.getCell(headerMap.get("ID")).getNumericCellValue()));
                member.setPassword(currentRow.getCell(headerMap.get("PASS")).getStringCellValue());
                member.setName(currentRow.getCell(headerMap.get("Name")).getStringCellValue());

                // map Dept. to specific values
                member.setMajor((int) currentRow.getCell(headerMap.get("Dept.")).getNumericCellValue());

                member.setPhoneNo(currentRow.getCell(headerMap.get("Phone")).getStringCellValue());
                member.setEmail(currentRow.getCell(headerMap.get("email")).getStringCellValue());

                // map Type to specific values
                String typeValue = currentRow.getCell(headerMap.get("Type")).getStringCellValue();
                switch (typeValue) {
                    case "관리자":
                        member.setAuthority(AuthState.OFFICE);
                        break;
                    case "교수":
                        member.setAuthority(AuthState.PROFESSOR);
                        break;
                    case "대학원생":
                        member.setAuthority(AuthState.POST_STUDENT);
                        break;
                    case "학부생":
                        member.setAuthority(AuthState.UNI_STUDENT);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid Type value: " + typeValue);
                }

                member.setNoshow((int) currentRow.getCell(headerMap.get("NoShow")).getNumericCellValue());

                memberRepository.save(member);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK)
                return false;
        }
        return true;
    }
}