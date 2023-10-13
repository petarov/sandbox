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

func Minimax(b Board, player int) (int, int) {
	win1, _, _ := b.checkWin(X)
	if win1 {
		return -1, -1
	}
	win2, _, _ := b.checkWin(O)
	if win2 {
		return 1, -1
	}
	if b.checkDraw() {
		return 0, -1
	}

	var bestScore int
	var bestMoveX, bestMoveY int

	if player == X {
		bestScore = -1
	} else {
		bestScore = 1
	}

	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if b[i][j] == Empty {
				b[i][j] = player
				score, _ := Minimax(b, 3-player)
				b[i][j] = Empty

				if player == X {
					if score > bestScore {
						bestScore = score
						bestMoveX = i
						bestMoveY = j
					}
				} else {
					if score < bestScore {
						bestScore = score
						bestMoveX = i
						bestMoveY = j
					}
				}
			}
		}
	}

	return bestScore, bestMoveX*3 + bestMoveY
}

func NewBoard() *Board {
	return &Board{
		{Empty, Empty, Empty},
		{Empty, Empty, Empty},
		{Empty, Empty, Empty},
	}
}
