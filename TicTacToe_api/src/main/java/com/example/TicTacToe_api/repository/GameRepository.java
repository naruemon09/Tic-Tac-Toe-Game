package com.example.TicTacToe_api.repository;

import com.example.TicTacToe_api.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GameRepository extends JpaRepository<Game, Integer> {
    List<Game> findAllByOrderByCreatedAtDesc();

    List<Game> findByWinnerIsNotOrderByCreatedAtDesc(String winner);
}
