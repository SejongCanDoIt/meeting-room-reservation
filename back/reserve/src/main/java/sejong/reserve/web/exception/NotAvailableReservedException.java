package sejong.reserve.web.exception;

public class NotAvailableReservedException extends RuntimeException {
    public NotAvailableReservedException(String message) {
        super(message);
    }
}