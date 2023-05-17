package sejong.reserve.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Room>> list() {
        List<Room> rooms = roomService.list();
        if (!rooms.isEmpty()) {
            return ResponseEntity.ok(rooms);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("detail/{room_id}")
    public ResponseEntity<Room> detail(@PathVariable Long room_id) {
        Room room = roomService.detail(room_id);
        if (room != null) {
            return ResponseEntity.ok(room);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("update")
    public void update(@RequestBody Room room) {
        roomService.update(room);
    }


    @DeleteMapping("delete/{room_id}")
    public void delete(@PathVariable Long room_id) {
        roomService.delete(room_id);
    }


}
