package com.codebreaker.backend.model;

public class GuessRequest {
    private String playerId;
    private String guess;

    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    public String getGuess() { return guess; }
    public void setGuess(String guess) { this.guess = guess; }
}