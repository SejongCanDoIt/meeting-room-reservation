package sejong.reserve.web.exception;

public class NotEnoughCntException extends RuntimeException {
    public NotEnoughCntException(String need_more_stock) {
        super(need_more_stock);
    }
}
