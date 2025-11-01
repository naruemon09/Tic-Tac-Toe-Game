package com.example.TicTacToe_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWinnerRequest {
    private Integer gameId;
    private String winner;
}
