package com.codebreaker.backend.controller;

import com.codebreaker.backend.model.*;
import com.codebreaker.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/create")
    public Room createRoom() {
        return gameService.createRoom();
    }

    @PostMapping("/{roomId}/join")
    public Room joinRoom(@PathVariable String roomId, @RequestParam String playerId) {
        return gameService.joinRoom(roomId, playerId);
    }

    @PostMapping("/{roomId}/set-code")
    public Room setSecretCode(@PathVariable String roomId, @RequestBody SetCodeRequest request) {
        return gameService.setSecretCode(roomId, request.getPlayerId(), request.getCode());
    }

    @PostMapping("/{roomId}/guess")
    public Map<String, Object> processGuess(@PathVariable String roomId, @RequestBody GuessRequest request) {
        return gameService.processGuess(roomId, request.getPlayerId(), request.getGuess());
    }

    @GetMapping("/{roomId}/status")
    public Room getRoomStatus(@PathVariable String roomId) {
        return gameService.getRoom(roomId);
    }

    // New helper to determine exact turn and role for a requesting player
    @GetMapping("/{roomId}/my-status")
    public Map<String, Object> getMyStatus(@PathVariable String roomId, @RequestParam String playerId) {
        Room room = gameService.getRoom(roomId);
        Map<String, Object> response = new HashMap<>();
        if (room == null) return response;

        boolean isP1 = playerId.equals(room.getPlayer1Id());
        boolean isP2 = playerId.equals(room.getPlayer2Id());

        boolean isMyTurn = (isP1 && "player1".equals(room.getCurrentTurn())) ||
                (isP2 && "player2".equals(room.getCurrentTurn()));

        response.put("room", room);
        response.put("role", isP1 ? "Player 1" : (isP2 ? "Player 2" : "Spectator"));
        response.put("isMyTurn", isMyTurn);
        return response;
    }
}