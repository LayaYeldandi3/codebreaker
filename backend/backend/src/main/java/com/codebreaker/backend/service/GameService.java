package com.codebreaker.backend.service;

import com.codebreaker.backend.model.Room;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {

    private final Map<String, Room> activeRooms = new ConcurrentHashMap<>();

    public Room createRoom() {
        String roomId = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        Room room = new Room(roomId);
        activeRooms.put(roomId, room);
        return room;
    }

    public Room joinRoom(String roomId, String playerId) {
        Room room = activeRooms.get(roomId);
        if (room == null) throw new IllegalArgumentException("Room not found!");

        if (room.getPlayer1Id() == null) {
            room.setPlayer1Id(playerId);
        } else if (room.getPlayer2Id() == null && !room.getPlayer1Id().equals(playerId)) {
            room.setPlayer2Id(playerId);
            room.setStatus("SETTING_CODES");
        }
        return room;
    }

    public Room setSecretCode(String roomId, String playerId, String code) {
        Room room = activeRooms.get(roomId);
        if (room == null) throw new IllegalArgumentException("Room not found!");

        if (playerId.equals(room.getPlayer1Id())) {
            room.setPlayer1Code(code);
        } else if (playerId.equals(room.getPlayer2Id())) {
            room.setPlayer2Code(code);
        }

        if (room.getPlayer1Code() != null && room.getPlayer2Code() != null) {
            room.setStatus("PLAYING");
        }

        return room;
    }

    public Map<String, Object> processGuess(String roomId, String playerId, String guess) {
        Room room = activeRooms.get(roomId);
        if (room == null) throw new IllegalArgumentException("Room not found!");

        boolean isPlayer1 = playerId.equals(room.getPlayer1Id());

        // Enforce Turn Check
        if ((isPlayer1 && !"player1".equals(room.getCurrentTurn())) ||
                (!isPlayer1 && !"player2".equals(room.getCurrentTurn()))) {
            throw new IllegalStateException("Not your turn!");
        }

        String targetCode = isPlayer1 ? room.getPlayer2Code() : room.getPlayer1Code();

        // Check each digit for Green reveal
        List<Boolean> matches = new ArrayList<>();
        int correctCount = 0;

        for (int i = 0; i < 4; i++) {
            boolean isMatch = guess.charAt(i) == targetCode.charAt(i);
            matches.add(isMatch);
            if (isMatch) correctCount++;
        }

        boolean won = correctCount == 4;
        if (won && room.getWinner() == null) {
            room.setWinner(playerId);
            room.setStatus("FINISHED");
        } else {
            // Switch turn
            room.setCurrentTurn(isPlayer1 ? "player2" : "player1");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("guess", guess);
        result.put("matches", matches); // Boolean list: [true, false, true, false]
        result.put("won", won);

        if (isPlayer1) {
            room.getPlayer1Guesses().add(result);
        } else {
            room.getPlayer2Guesses().add(result);
        }

        return result;
    }

    public Room getRoom(String roomId) {
        return activeRooms.get(roomId);
    }
}