package sejong.reserve.repository;

import javax.persistence.PersistenceException;
import java.util.List;

public interface Repo<T> {
    void save(T t);

    T findById(Long id);

    List<T> findAll();

    void delete(Long id) throws PersistenceException;

    void update(T t) throws PersistenceException;
}
