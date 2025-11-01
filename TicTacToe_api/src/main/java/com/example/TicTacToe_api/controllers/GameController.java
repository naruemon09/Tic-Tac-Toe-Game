package com.example.TicTacToe_api.controllers;

import com.example.TicTacToe_api.dtos.GameRequest;
import com.example.TicTacToe_api.dtos.GameResponse;
import com.example.TicTacToe_api.dtos.MoveRequest;
import com.example.TicTacToe_api.dtos.UpdateWinnerRequest;
import com.example.TicTacToe_api.services.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PostMapping("/add")
    public ResponseEntity<GameResponse> createGame(@RequestBody GameRequest gameRequest) {
        return ResponseEntity.ok(gameService.createGame(gameRequest));
    }

    @PostMapping("/move")
    public ResponseEntity<GameResponse> makeMove(@RequestBody MoveRequest moveRequest) {
        return ResponseEntity.ok(gameService.makeMove(moveRequest));
    }

    @PutMapping("/winner")
    public ResponseEntity<GameResponse> updateWinner(@RequestBody UpdateWinnerRequest updateWinnerRequest) {
        return ResponseEntity.ok(gameService.updateWinner(updateWinnerRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponse> getGame(@PathVariable Integer id) {
        return ResponseEntity.ok(gameService.getGame(id));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getGameStats() {
        List<GameResponse> games = gameService.getAllGames();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalGames", games.size());
        stats.put("games", games);

        long playerXWins = games.stream().filter(g -> g.getWinner().equals("X")).count();
        long playerOWins = games.stream().filter(g -> g.getWinner().equals("O")).count();
        long draws = games.stream().filter(g -> g.getWinner().equals("draw")).count();

        stats.put("playerXWins", playerXWins);
        stats.put("playerOWins", playerOWins);
        stats.put("draws", draws);

        return ResponseEntity.ok(stats);
    }
}
