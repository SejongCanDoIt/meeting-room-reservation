package sejong.reserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.reserve.domain.Room;
import sejong.reserve.repository.RoomRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService implements Serv<Room> {
    private final RoomRepository roomRepository;

    @Transactional
    public Long create(Room roomInfo) {
        Room room = Room.createRoom(roomInfo);

        // 회의실 정보 저장
        roomRepository.save(room);
        return room.getId();
    }

    /**
     * 회의실 전체 조회
     */
    public List<Room> list() {
        List<Room> rooms = roomRepository.findAll();
        return rooms;
    }

    @Override
    public Room detail(Long id) {
        return roomRepository.findById(id);
    }


    /**
     * 회의실 수정
     */
    @Transactional
    public void update(Room roomInfo) {
        Room room = roomRepository.findById(roomInfo.getId());
        room.setRoom(room, roomInfo);
    }

    /**
     * 회의실 삭제
     */
    @Transactional
    public void delete(Long roomId) {
        roomRepository.delete(roomId);
    }


}
