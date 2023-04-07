package sejong.reserve.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sejong.reserve.domain.Room;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import java.util.List;

import static sejong.reserve.domain.Room.setRoom;

@Repository
@RequiredArgsConstructor
public class RoomRepository implements Repo<Room> {
    private final EntityManager em;

    @Override
    public void save(Room room) {
        em.persist(room);
    }

    @Override
    public Room findById(Long id) {
        return em.find(Room.class, id);
    }

    @Override
    public List<Room> findAll() {
        return em.createQuery("select m from Room m", Room.class)
                .getResultList();
    }

    @Override
    public void delete(Long id) throws PersistenceException {
        Room room = findById(id);
        em.remove(room);
    }

    @Override
    public void update(Room roomInfo) throws PersistenceException {
        Room room = em.find(Room.class, roomInfo.getId());
        room.setRoom(roomInfo, room);
    }

}
