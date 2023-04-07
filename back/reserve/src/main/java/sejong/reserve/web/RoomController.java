package sejong.reserve.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sejong.reserve.domain.Room;
import sejong.reserve.service.RoomService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room/")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("insert")
    public Long insert(@RequestBody Room room) {
        return roomService.create(room);
    }

    @GetMapping("list")
    public List<Room> list() {
        return roomService.list();
    }

    @GetMapping("detail/{room_id}")
    public Room detail(@PathVariable Long room_id) {
        return roomService.detail(room_id);
    }

    @PutMapping("update")
    public void update(@RequestBody Room room) {
        roomService.update(room);
    }

    @DeleteMapping("delete/{room_id}")
    public void delete(@PathVariable Long room_id) {
        roomService.delete(room_id);
    }

}
