package com.example.TicTacToe_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameRequest {
    private Integer boardSize;
    private String playerX;
    private String playerO;
}
