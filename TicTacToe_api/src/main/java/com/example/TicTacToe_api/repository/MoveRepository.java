package com.example.TicTacToe_api.repository;

import com.example.TicTacToe_api.entity.Move;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoveRepository extends JpaRepository<Move, Integer> {
    List<Move> findByGame_IdOrderByMoveNumberAsc(Integer gameId);
}
