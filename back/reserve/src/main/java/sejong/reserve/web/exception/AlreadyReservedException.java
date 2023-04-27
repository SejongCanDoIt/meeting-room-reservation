package sejong.reserve.web.exception;

public class AlreadyReservedException extends RuntimeException {
    public AlreadyReservedException(String message) {
        super(message);
    }
}