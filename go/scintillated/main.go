package main

import (
	"log"

	"github.com/hajimehoshi/ebiten/v2"
)

const (
	ScreenWidth  = 800
	ScreenHeight = 360
)

func main() {
	game := &Game{
		screenWidth:  ScreenWidth,
		screenHeight: ScreenHeight,
	}
	game.Init()

	ebiten.SetWindowSize(ScreenWidth, ScreenHeight)
	ebiten.SetWindowTitle("scintillated")

	if err := ebiten.RunGame(game); err != nil {
		log.Fatal(err)
	}
}
