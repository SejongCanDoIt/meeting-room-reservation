package sejong.reserve.service;

import java.util.List;

public interface Serv<T> {

    /**
     * 생성
     */
    Long create(T t);

    /**
     * 전체 조회
     */
    List<T> list();

    /**
     * 상세조회
     */
    T detail(Long id);

    /**
     * 수정
     */
    void update(T t);

    /**
     * 삭제
     */
    void delete(Long id);

}
