package main

import (
	"image/color"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/vector"
)

type Board struct {
	cellWidth float32
	LineWidth float32
	DotRadius float32
}

func (b *Board) Draw(screen *ebiten.Image) {
	screenWidth, screenHeight := screen.Bounds().Dx(), screen.Bounds().Dy()

	// Fixed cell width
	cellWidth := b.cellWidth

	// Calculate rows and cols based on screen size
	cols := int(float32(screenWidth) / cellWidth)
	rows := int(float32(screenHeight) / cellWidth)

	lineColor := &color.RGBA{88, 88, 88, 0xff}

	// Draw black filled squares
	for i := 0; i < cols; i++ {
		for j := 0; j < rows; j++ {
			x := float32(i) * cellWidth
			y := float32(j) * cellWidth
			vector.FillRect(screen, x, y, cellWidth, cellWidth, color.Black, false)
		}
	}

	// Draw vertical gray lines
	for i := 0; i <= cols; i++ {
		x := float32(i) * cellWidth
		vector.StrokeLine(screen, x, 0, x, float32(screenHeight), b.LineWidth, lineColor, false)
	}

	// Draw horizontal gray lines
	for i := 0; i <= rows; i++ {
		y := float32(i) * cellWidth
		vector.StrokeLine(screen, 0, y, float32(screenWidth), y, b.LineWidth, lineColor, false)
	}

	// Draw white dots at intersections (key to the illusion)
	for i := 0; i <= cols; i++ {
		for j := 0; j <= rows; j++ {
			x := float32(i) * cellWidth
			y := float32(j) * cellWidth
			vector.FillCircle(screen, x, y, b.DotRadius, color.White, false)
		}
	}
}
