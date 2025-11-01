package com.example.TicTacToe_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameResponse {
    private Integer id;
    private String playerX;
    private String playerO;
    private Integer boardSize;
    private String winner;
    private LocalDateTime createdAt;
    private List<MoveResponse> moves;
}
