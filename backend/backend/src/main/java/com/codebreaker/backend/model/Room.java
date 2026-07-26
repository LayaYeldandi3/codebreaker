package com.codebreaker.backend.model;

import java.util.*;

public class Room {
    private String roomId;
    private String player1Id;
    private String player2Id;
    private String player1Code;
    private String player2Code;
    private List<Map<String, Object>> player1Guesses = new ArrayList<>();
    private List<Map<String, Object>> player2Guesses = new ArrayList<>();
    private String currentTurn; // "player1" or "player2"
    private String winner;
    private String status; // "WAITING", "SETTING_CODES", "PLAYING", "FINISHED"

    public Room(String roomId) {
        this.roomId = roomId;
        this.status = "WAITING";
        this.currentTurn = "player1";
    }

    public String getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(String currentTurn) { this.currentTurn = currentTurn; }
    public String getRoomId() { return roomId; }
    public String getPlayer1Id() { return player1Id; }
    public void setPlayer1Id(String player1Id) { this.player1Id = player1Id; }
    public String getPlayer2Id() { return player2Id; }
    public void setPlayer2Id(String player2Id) { this.player2Id = player2Id; }
    public String getPlayer1Code() { return player1Code; }
    public void setPlayer1Code(String player1Code) { this.player1Code = player1Code; }
    public String getPlayer2Code() { return player2Code; }
    public void setPlayer2Code(String player2Code) { this.player2Code = player2Code; }
    public List<Map<String, Object>> getPlayer1Guesses() { return player1Guesses; }
    public List<Map<String, Object>> getPlayer2Guesses() { return player2Guesses; }
    public String getWinner() { return winner; }
    public void setWinner(String winner) { this.winner = winner; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}