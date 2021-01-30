package main

import (
	"fmt"
	"log"

	"github.com/petarov/punch-line/app"
)

const AppName = "Punch Line"
const Version = "1.0"

func main() {
	fmt.Printf("%s v%s - Do some noise while you do your shell mojo.\n", AppName, Version)

	app, err := app.NewApplication()
	if err != nil {
		log.Fatalf("Error creating app! %s", err)
	}

	exitCode, err := app.Run()
	if err != nil {
		log.Fatalf("Error running app! %s", err)
	}

	switch exitCode {
	case 0:
	case -1:
		log.Fatal("Access denied! You need to allow accessibility in System Preferences > Security & Privacy for key events to be monitored.")
	default:
		log.Fatalf("Error: %d", exitCode)
	}
}
