package sejong.reserve.domain;

import com.opencsv.bean.AbstractBeanField;
import com.opencsv.bean.AbstractCsvConverter;
import com.opencsv.bean.CsvConverter;
import com.opencsv.exceptions.CsvDataTypeMismatchException;

import java.util.Locale;

public class AuthStateConverter extends AbstractBeanField<AuthState, AuthState> {

    @Override
    protected AuthState convert(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }

        switch (value.trim()) {
            case "학생":
                return AuthState.UNI_STUDENT;
            case "교수":
                return AuthState.PROFESSOR;
            case "교직원":
                return AuthState.OFFICE;
            case "대학원생":
                return AuthState.POST_STUDENT;
            default:
                throw new IllegalArgumentException("Invalid AuthState value: " + value);
        }
    }

    @Override
    public String convertToWrite(Object value) throws CsvDataTypeMismatchException {
        if (value == null) {
            return null;
        }

        if (!(value instanceof AuthState)) {
            throw new CsvDataTypeMismatchException("Invalid AuthState value: " + value);
        }

        return value.toString();
    }
}