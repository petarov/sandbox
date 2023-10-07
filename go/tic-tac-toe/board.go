package main

type Board [3][3]int

const (
	Empty = 0
	X     = 1
	O     = 2
)

func checkWin(board Board, player int) bool {
	// Check rows, columns, and diagonals for a win
	for i := 0; i < 3; i++ {
		if board[i][0] == player && board[i][1] == player && board[i][2] == player {
			return true // Row win
		}
		if board[0][i] == player && board[1][i] == player && board[2][i] == player {
			return true // Column win
		}
	}
	if board[0][0] == player && board[1][1] == player && board[2][2] == player {
		return true // Diagonal win (top-left to bottom-right)
	}
	if board[0][2] == player && board[1][1] == player && board[2][0] == player {
		return true // Diagonal win (top-right to bottom-left)
	}
	return false
}

func checkDraw(board Board) bool {
	// Check for a draw (all cells filled)
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if board[i][j] == Empty {
				return false // There's an empty cell, not a draw
			}
		}
	}
	return true // All cells are filled, it's a draw
}

func NewBoard() *Board {
	return &Board{
		{Empty, Empty, Empty},
		{Empty, Empty, Empty},
		{Empty, Empty, Empty},
	}
}

// func main() {
// 	board := Board{
// 		{X, O, X},
// 		{Empty, X, O},
// 		{O, X, O},
// 	}

// 	if checkWin(board, X) {
// 		fmt.Println("Player X wins!")
// 	} else if checkWin(board, O) {
// 		fmt.Println("Player O wins!")
// 	} else if checkDraw(board) {
// 		fmt.Println("It's a draw!")
// 	} else {
// 		fmt.Println("The game is still ongoing.")
// 	}
// }
