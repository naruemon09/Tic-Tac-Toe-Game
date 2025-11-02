# 🎮 Tic Tac Toe Game

A **full-stack Tic Tac Toe game** with 3 AI difficulty levels and game history stored in a MySQL database.

## 🚀 Features
- Play Tic Tac Toe with **Player vs Player** or **Player vs AI**
- 3 AI difficulty levels: *Easy*, *Medium*, *Hard*
- Game history and results stored in a database
- Responsive design with a modern React UI
- RESTful API powered by Spring Boot

## 🧠 Algorithm & AI Logic Explanation

### 🟢 Easy Mode
- The AI randomly selects an empty cell.
- No strategy or prediction is applied.  
➡️ Designed to simulate a beginner player.

### 🟡 Medium Mode
- The AI checks for **possible winning moves** and **blocks opponent’s winning moves**.
- If no immediate win or block is available, it chooses a **random available cell**.  
➡️ Balances between randomness and basic tactical play.

### 🔴 Hard Mode
- Uses the **Minimax algorithm** with pruning.
- Evaluates all possible moves recursively to choose the **optimal outcome**.
- Guarantees the AI **never loses** (it can only win or draw).  
➡️ Represents an advanced, perfect-play AI.

## 🛠 Tech Stack
- **Frontend:** React + TypeScript + Tailwind CSS  
- **Backend:** Java Spring Boot  
- **Database:** MySQL  

## ⚙️ Installation
```bash
git clone https://github.com/naruemon09/Tic-Tac-Toe-Game.git
```
**Backend (Spring Boot)**
```bash
cd TicTacToe_api
mvn spring-boot:run
```
***Frontend (React)***
```bash
cd TicTacToe_app
npm install
npm run dev

