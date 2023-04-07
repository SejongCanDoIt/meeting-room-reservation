package sejong.reserve.exception;

public class NotEnoughStockExeption extends RuntimeException {
    public NotEnoughStockExeption() {
        super();
    }

    public NotEnoughStockExeption(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughStockExeption(Throwable cause) {
        super(cause);
    }



    public NotEnoughStockExeption(String need_more_stock) {
    }
}
