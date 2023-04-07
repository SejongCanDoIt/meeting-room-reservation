/*
package sejong.reserve.function;


import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import sejong.reserve.domain.Member;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class MemberCsvLoader {
public List<Member> loadCsv(String filePath) throws IOException{
    List<Member> members = new ArrayList<>();
    try(Reader reader = Files.newBufferedReader(Paths.get(filePath));
        CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build()){
        String[] line;
        while((line=csvReader.readNext())!=null){
            Member member = new Member();
            member.setStudentNo(line[0]);
            member.setName(line[1]);
            member.setPhoneNo(line[2]);
            members.add(member);
        }
    } catch (CsvValidationException e) {
        throw new RuntimeException(e);
    }
    return members;
    }
}
*/
