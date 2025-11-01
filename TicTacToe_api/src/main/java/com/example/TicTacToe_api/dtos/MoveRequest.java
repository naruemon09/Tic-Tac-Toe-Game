package com.example.TicTacToe_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoveRequest {
    private Integer gameId;
    private String player;
    private Integer rowIndex;
    private Integer colIndex;
}
