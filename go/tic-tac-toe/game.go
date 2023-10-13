package main

import (
	"fmt"
	"image"
	"image/color"
	"math"
	"math/rand"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/inpututil"
	"github.com/hajimehoshi/ebiten/v2/vector"
)

const (
	screenWidth   = 800
	screenHeight  = 600
	strokeWidth   = 5
	gameStatePlay = 1
	gameStateWin  = 2
	gameStateDraw = 3
)

var (
	lineColor     = color.RGBA{0x33, 0x33, 0xb0, 0}
	winColor      = color.RGBA{0xb0, 0x33, 0x33, 0}
	whiteImage    = ebiten.NewImage(3, 3)
	whiteSubImage = whiteImage.SubImage(image.Rect(1, 1, 2, 2)).(*ebiten.Image)
)

type Game struct {
	state    int
	nextTurn int
	winner   int
	winPos   int
	winCoord int
	board    *Board
}

func drawPath(screen *ebiten.Image, path vector.Path, line bool) {
	var vs []ebiten.Vertex
	var is []uint16

	if line {
		op := &vector.StrokeOptions{}
		op.Width = strokeWidth
		op.LineJoin = vector.LineJoinRound
		vs, is = path.AppendVerticesAndIndicesForStroke(nil, nil, op)
	} else {
		// vs, is = path.AppendVerticesAndIndicesForFilling(nil, nil)
	}

	for i := range vs {
		vs[i].DstX = (vs[i].DstX + float32(0))
		vs[i].DstY = (vs[i].DstY + float32(0))
		vs[i].SrcX = 1
		vs[i].SrcY = 1
		vs[i].ColorR = float32(lineColor.R) / float32(0xff)
		vs[i].ColorG = float32(lineColor.G) / float32(0xff)
		vs[i].ColorB = float32(lineColor.B) / float32(0xff)
		vs[i].ColorA = 1
	}

	op := &ebiten.DrawTrianglesOptions{}
	op.AntiAlias = true
	if !line {
		op.FillRule = ebiten.EvenOdd
	}

	screen.DrawTriangles(vs, is, whiteSubImage, op)
}

func drawBoardOutline(screen *ebiten.Image) {
	var path vector.Path
	w := float32(screenWidth)
	h := float32(screenHeight)

	path.MoveTo(w/3, 0)
	path.LineTo(w/3, h)
	path.Close()

	path.MoveTo(w-w/3, 0)
	path.LineTo(w-w/3, h)
	path.Close()

	path.MoveTo(0, h/3)
	path.LineTo(w, h/3)
	path.Close()

	path.MoveTo(0, h-h/3)
	path.LineTo(w, h-h/3)
	path.Close()

	drawPath(screen, path, true)
}

func drawO(screen *ebiten.Image, col, row int) {
	w := float32(screenWidth)
	h := float32(screenHeight)
	cw := w / 3
	ch := h / 3

	vector.StrokeCircle(screen, float32(col)*cw+cw*0.5, float32(row)*ch+ch*0.5, cw*0.25, strokeWidth, lineColor, true)
}

func drawX(screen *ebiten.Image, col, row int) {
	w := float32(screenWidth)
	h := float32(screenHeight)
	cw := w / 3
	ch := h / 3
	offset_x := float32(50)
	offset_y := float32(30)

	vector.StrokeLine(screen,
		float32(col)*cw+offset_x, float32(row)*ch+offset_y, float32(col)*cw+cw-offset_x, float32(row)*ch+ch-offset_y,
		strokeWidth, lineColor, true)
	vector.StrokeLine(screen,
		float32(col)*cw+cw-offset_x, float32(row)*ch+offset_y, float32(col)*cw+offset_x, float32(row)*ch+ch-offset_y,
		strokeWidth, lineColor, true)
}

func drawRowLine(screen *ebiten.Image, row int) {
	ch := float32(screenHeight) / 3
	mid := float32(row)*ch + ch*0.5
	vector.StrokeLine(screen, float32(0), mid, float32(screenWidth), mid, strokeWidth, winColor, true)
}

func drawColLine(screen *ebiten.Image, col int) {
	cw := float32(screenWidth) / 3
	mid := float32(col)*cw + cw*0.5
	vector.StrokeLine(screen, mid, float32(0), mid, float32(screenHeight), strokeWidth, winColor, true)
}

func drawTopLeftLine(screen *ebiten.Image) {
	vector.StrokeLine(screen, 0, 0, float32(screenWidth), float32(screenHeight), strokeWidth, winColor, true)
}

func drawTopRightLine(screen *ebiten.Image) {
	vector.StrokeLine(screen, float32(screenWidth), 0, 0, float32(screenHeight), strokeWidth, winColor, true)
}

func (g *Game) Update() error {
	pressed := inpututil.IsMouseButtonJustReleased(ebiten.MouseButtonLeft)

	if g.state == gameStatePlay {
		if g.nextTurn == O {
			// human O
			if pressed {
				// translate to board coordinates
				x, y := ebiten.CursorPosition()
				col := int(math.Floor(float64(x) / float64(screenWidth*0.333)))
				row := int(math.Floor(float64(y) / float64(screenHeight*0.333)))

				g.board[row][col] = O
				g.nextTurn = X
				won, pos, coord := g.board.checkWin(O)
				if won {
					fmt.Println("O wins")
					g.state = gameStateWin
					g.winner = O
					g.winPos = pos
					g.winCoord = coord
				}
			}
		} else {
			// computer X
			_, bestMove := Minimax(*g.board, X)
			row, col := bestMove/3, bestMove%3
			fmt.Printf("X decided: col=%d  row=%d\n", col, row)

			g.board[row][col] = X
			g.nextTurn = O
			won, pos, coord := g.board.checkWin(X)
			if won {
				fmt.Println("X wins")
				g.state = gameStateWin
				g.winner = X
				g.winPos = pos
				g.winCoord = coord
			}
		}

		if g.state == gameStatePlay && g.board.checkDraw() {
			fmt.Println("DRAW")
			g.state = gameStateDraw
		}
	} else if pressed {
		// new game
		g.state = gameStatePlay
		g.nextTurn = rand.Intn(O) + X
		g.board = NewBoard()
	}

	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	drawBoardOutline(screen)

	for row := 0; row < 3; row++ {
		for col := 0; col < 3; col++ {
			switch g.board[row][col] {
			case X:
				drawX(screen, col, row)
			case O:
				drawO(screen, col, row)
			}
		}
	}

	if g.state == gameStateWin {
		switch g.winPos {
		case WinCol:
			drawColLine(screen, g.winCoord)
		case WinRow:
			drawRowLine(screen, g.winCoord)
		case WinTLD:
			drawTopLeftLine(screen)
		case WinTRD:
			drawTopRightLine(screen)
		}
	}
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
	return screenWidth, screenHeight
}

func NewGame() *Game {
	whiteImage.Fill(color.White)
	return &Game{
		gameStatePlay,
		rand.Intn(O) + X,
		Empty,
		0, 0,
		NewBoard(),
	}
}
