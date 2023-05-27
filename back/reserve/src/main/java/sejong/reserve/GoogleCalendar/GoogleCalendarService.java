/*
package sejong.reserve.GoogleCalendar;


import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import org.springframework.stereotype.Service;
import sejong.reserve.domain.Reservation;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.List;

@Service
public class GoogleCalendarService {
    private static final NetHttpTransport HTTP_TRANSPORT;

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private final String APPLICATION_NAME = "YOUR_APPLICATION_NAME";
    private final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private final String TOKENS_DIRECTORY_PATH = "tokens";

    public void addEventToCalendar(Reservation reservation) throws GeneralSecurityException, IOException {
        // Initialize Calendar service with valid OAuth credentials
        Calendar service = new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();

        // Create and set the event details
        Event event = new Event();
        event.setSummary("Reservation: " + reservation.getName());
        event.setDescription(reservation.getDescription());

        DateTime startDateTime = new DateTime(reservation.getStartDate());
        EventDateTime start = new EventDateTime().setDateTime(startDateTime).setTimeZone("YOUR_TIME_ZONE");
        event.setStart(start);

        DateTime endDateTime = new DateTime(reservation.getEndDate());
        EventDateTime end = new EventDateTime().setDateTime(endDateTime).setTimeZone("YOUR_TIME_ZONE");
        event.setEnd(end);

        // Add the event to the user's Google Calendar
        service.events().insert("primary", event).execute();
    }

    // The following methods getCredentials() and HTTP_TRANSPORT are as per the Google Calendar Java API client library
    // which need to be defined. getCredentials() function should return GoogleCredential and HTTP_TRANSPORT should return
    // a NetHttpTransport instance.
}

*/
