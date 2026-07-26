package com.codebreaker.backend.model;

public class SetCodeRequest {
    private String playerId;
    private String code;

    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}