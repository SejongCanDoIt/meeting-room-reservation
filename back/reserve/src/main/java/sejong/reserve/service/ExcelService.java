package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.AuthState;
import sejong.reserve.domain.Member;
import sejong.reserve.repository.MemberRepository;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ExcelService {
    private final MemberRepository memberRepository;

    @Transactional
    public void importExcelFile(InputStream in) {
        memberRepository.deleteAll();
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
                member.setStudentNo(getCellValueAsString(currentRow.getCell(headerMap.get("ID"))));
                member.setPassword(getCellValueAsString(currentRow.getCell(headerMap.get("PASS"))));
                member.setName(getCellValueAsString(currentRow.getCell(headerMap.get("Name"))));
                member.setMajor(getCellValueAsInt(currentRow.getCell(headerMap.get("Dept."))));
                member.setPhoneNo(getCellValueAsString(currentRow.getCell(headerMap.get("Phone"))));
                member.setEmail(getCellValueAsString(currentRow.getCell(headerMap.get("email"))));

                // map Type to specific values
                String typeValue = getCellValueAsString(currentRow.getCell(headerMap.get("Type")));
                switch (typeValue) {
                    case "1":
                        member.setAuthority(AuthState.OFFICE);
                        break;
                    case "2":
                        member.setAuthority(AuthState.PROFESSOR);
                        break;
                    case "3":
                        member.setAuthority(AuthState.POST_STUDENT);
                        break;
                    case "4":
                        member.setAuthority(AuthState.UNI_STUDENT);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid Type value: " + typeValue);
                }

                member.setNoshow(getCellValueAsInt(currentRow.getCell(headerMap.get("NoShow"))));

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

    private String getCellValueAsString(Cell cell) {
        if (cell == null)
            return null;

        CellType cellType = cell.getCellType();
        if (cellType == CellType.STRING) {
            return cell.getStringCellValue();
        } else if (cellType == CellType.NUMERIC || cellType == CellType.FORMULA) {
            cell.setCellType(CellType.STRING); // convert numeric or formula cell to string cell
            return cell.getStringCellValue();
        } else {
            return null;
        }
    }

    private int getCellValueAsInt(Cell cell) {
        String cellValue = getCellValueAsString(cell);
        if (cellValue == null)
            return 0;
        return Integer.parseInt(cellValue);
    }
}