import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor TicTacToe {
  type Cell = ?Bool;  // null: empty, true: X, false: O
  type Board = [[Cell]];

  stable var board : Board = [[null, null, null], [null, null, null], [null, null, null]];
  stable var currentPlayer : Bool = true;  // true: X, false: O
  stable var gameOver : Bool = false;

  public func resetGame() : async () {
    board := [[null, null, null], [null, null, null], [null, null, null]];
    currentPlayer := true;
    gameOver := false;
  };

  public query func getBoard() : async [[?Bool]] {
    board
  };

  public query func getCurrentPlayer() : async Bool {
    currentPlayer
  };

  public query func isGameOver() : async Bool {
    gameOver
  };

  public func makeMove(row : Nat, col : Nat) : async Bool {
    if (gameOver or row >= 3 or col >= 3) {
      return false;
    };

    switch (board[row][col]) {
      case null {
        let newRow = Array.tabulate<Cell>(3, func (i) {
          if (i == col) { ?currentPlayer } else { board[row][i] }
        });
        board := Array.tabulate<[Cell]>(3, func (i) {
          if (i == row) { newRow } else { board[i] }
        });

        if (checkWin()) {
          gameOver := true;
        } else if (checkDraw()) {
          gameOver := true;
        } else {
          currentPlayer := not currentPlayer;
        };
        true
      };
      case _ { false };
    }
  };

  private func checkWin() : Bool {
    let lines = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ];

    for (line in lines.vals()) {
      switch (line[0], line[1], line[2]) {
        case (?a, ?b, ?c) {
          if (a == b and b == c) {
            return true;
          };
        };
        case _ {};
      };
    };
    false
  };

  private func checkDraw() : Bool {
    for (row in board.vals()) {
      for (cell in row.vals()) {
        if (cell == null) {
          return false;
        };
      };
    };
    true
  };
}
