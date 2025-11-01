package com.example.TicTacToe_api.services;

import com.example.TicTacToe_api.dtos.*;
import com.example.TicTacToe_api.entity.Game;
import com.example.TicTacToe_api.entity.Move;
import com.example.TicTacToe_api.repository.GameRepository;
import com.example.TicTacToe_api.repository.MoveRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final MoveRepository moveRepository;

    @Transactional
    public GameResponse createGame(GameRequest gameRequest) {
        Game game = new Game();
        game.setPlayerX(gameRequest.getPlayerX());
        game.setPlayerO(gameRequest.getPlayerO());
        game.setBoardSize(gameRequest.getBoardSize());
        game.setWinner("");

        Game savedGame = gameRepository.save(game);

        return convertToResponse(game);
    }

    public GameResponse getGame(Integer gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        return convertToResponse(game);
    }

    @Transactional
    public GameResponse makeMove(MoveRequest moveRequest) {
        Game game = gameRepository.findById(moveRequest.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found"));

        List<Move> existingMoves = moveRepository.findByGame_IdOrderByMoveNumberAsc(moveRequest.getGameId());

        Move move = new Move();
        move.setGame(game);
        move.setMoveNumber(existingMoves.size() + 1);
        move.setPlayer(moveRequest.getPlayer());
        move.setRowIndex(moveRequest.getRowIndex());
        move.setColIndex(moveRequest.getColIndex());

        moveRepository.save(move);

        return getGame(moveRequest.getGameId());
    }

    @Transactional
    public GameResponse updateWinner(UpdateWinnerRequest updateWinnerRequest) {
        Game game = gameRepository.findById(updateWinnerRequest.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found"));

        game.setWinner(updateWinnerRequest.getWinner());
        gameRepository.save(game);

        return convertToResponse(game);
    }

    private GameResponse convertToResponse(Game game) {
        GameResponse response = new GameResponse();
        response.setId(game.getId());
        response.setPlayerX(game.getPlayerX());
        response.setPlayerO(game.getPlayerO());
        response.setBoardSize(game.getBoardSize());
        response.setWinner(game.getWinner());
        response.setCreatedAt(game.getCreatedAt());

        List<Move> moves = moveRepository.findByGame_IdOrderByMoveNumberAsc(game.getId());
        List<MoveResponse> moveResponses = moves.stream()
                .map(move -> {
                    MoveResponse mr = new MoveResponse();
                    mr.setId(move.getId());
                    mr.setMoveNumber(move.getMoveNumber());
                    mr.setPlayer(move.getPlayer());
                    mr.setRowIndex(move.getRowIndex());
                    mr.setColIndex(move.getColIndex());
                    return mr;
                })
                .collect(Collectors.toList());

        response.setMoves(moveResponses);

        return response;
    }

    public List<GameResponse> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return games.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}
