package main

import (
	"image"
	"image/color"
	"math"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/inpututil"
	"github.com/hajimehoshi/ebiten/v2/vector"
)

const (
	screenWidth  = 800
	screenHeight = 600
	strokeWidth  = 5
)

var (
	lineColor     = color.RGBA{0x33, 0x33, 0xb0, 0}
	whiteImage    = ebiten.NewImage(3, 3)
	whiteSubImage = whiteImage.SubImage(image.Rect(1, 1, 2, 2)).(*ebiten.Image)
)

type Game struct {
	board *Board
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

func drawO(screen *ebiten.Image, x, y int) {
	w := float32(screenWidth)
	h := float32(screenHeight)
	cw := w / 3
	ch := h / 3

	vector.StrokeCircle(screen, float32(x)*cw+cw*0.5, float32(y)*ch+ch*0.5, cw*0.25, strokeWidth, lineColor, true)
}

func drawX(screen *ebiten.Image, x, y int) {
	w := float32(screenWidth)
	h := float32(screenHeight)
	cw := w / 3
	ch := h / 3
	offset_x := float32(50)
	offset_y := float32(30)

	vector.StrokeLine(screen,
		float32(x)*cw+offset_x, float32(y)*ch+offset_y, float32(x)*cw+cw-offset_x, float32(y)*ch+ch-offset_y,
		strokeWidth, lineColor, true)
	vector.StrokeLine(screen,
		float32(x)*cw+cw-offset_x, float32(y)*ch+offset_y, float32(x)*cw+offset_x, float32(y)*ch+ch-offset_y,
		strokeWidth, lineColor, true)
}

func (g *Game) Update() error {

	pressed := inpututil.IsMouseButtonJustReleased(ebiten.MouseButtonLeft)

	if pressed {
		// translate to board coordinates
		x, y := ebiten.CursorPosition()
		col := int(math.Floor(float64(x) / float64(screenWidth*0.333)))
		row := int(math.Floor(float64(y) / float64(screenHeight*0.333)))
		g.board[row][col] = X
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
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
	return screenWidth, screenHeight
}

func NewGame() *Game {
	whiteImage.Fill(color.White)
	return &Game{
		NewBoard(),
	}
}
