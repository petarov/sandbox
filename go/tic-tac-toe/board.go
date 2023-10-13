package main

type Board [3][3]int

const (
	Empty  = 0
	X      = 1
	O      = 2
	WinCol = 10
	WinRow = 11
	WinTLD = 12
	WinTRD = 13
)

func (b *Board) checkWin(player int) (bool, int, int) {
	// Check rows, columns, and diagonals for a win
	for i := 0; i < 3; i++ {
		if b[i][0] == player && b[i][1] == player && b[i][2] == player {
			return true, WinRow, i // Row win
		}
		if b[0][i] == player && b[1][i] == player && b[2][i] == player {
			return true, WinCol, i // Column win
		}
	}
	if b[0][0] == player && b[1][1] == player && b[2][2] == player {
		return true, WinTLD, 0 // Diagonal win (top-left to bottom-right)
	}
	if b[0][2] == player && b[1][1] == player && b[2][0] == player {
		return true, WinTRD, 0 // Diagonal win (top-right to bottom-left)
	}

	return false, 0, 0
}

func (b *Board) checkDraw() bool {
	// Check for a draw (all cells filled)
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if b[i][j] == Empty {
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
