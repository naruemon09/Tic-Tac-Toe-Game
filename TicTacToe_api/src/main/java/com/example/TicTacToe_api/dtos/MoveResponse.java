package com.example.TicTacToe_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoveResponse {
    private Integer id;
    private Integer moveNumber;
    private String player;
    private Integer rowIndex;
    private Integer colIndex;
}
