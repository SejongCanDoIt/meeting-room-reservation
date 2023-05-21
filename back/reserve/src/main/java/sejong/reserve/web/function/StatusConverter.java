package sejong.reserve.web.function;

import sejong.reserve.domain.ReservationStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StatusConverter implements AttributeConverter<ReservationStatus, String> {

    @Override
    public String convertToDatabaseColumn(ReservationStatus status) {
        if (status == null)
            return null;
        return status.name();
    }

    @Override
    public ReservationStatus convertToEntityAttribute(String dbStatus) {
        if (dbStatus == null)
            return null;
        return ReservationStatus.valueOf(dbStatus);
    }
}
