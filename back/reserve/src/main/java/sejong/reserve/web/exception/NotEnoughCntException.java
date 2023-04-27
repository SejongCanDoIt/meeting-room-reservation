package sejong.reserve.web.exception;

public class NotEnoughCntException extends RuntimeException {
    public NotEnoughCntException() {
        super();
    }

    public NotEnoughCntException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughCntException(Throwable cause) {
        super(cause);
    }



    public NotEnoughCntException(String need_more_stock) {
    }
}
