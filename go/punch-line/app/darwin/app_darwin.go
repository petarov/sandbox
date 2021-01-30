package darwin

import (
	// #cgo CFLAGS: -x objective-c
	// #cgo LDFLAGS: -framework Cocoa
	// #include "app_darwin.h"
	"C"
)
import (
	"fmt"
	"unsafe"

	"github.com/petarov/punch-line/audio"
)

func CreateApplication() unsafe.Pointer {
	return C.SharedApplication()
}

func RunApplication(appPtr unsafe.Pointer) int {
	return int(C.Run(appPtr))
}

//export OnAppStarted
func OnAppStarted() {
	audio.InitPlayer()
}

//export OnAppTerminated
func OnAppTerminated() {

}

//export OnKeyDown
func OnKeyDown(keyCode uint) {
	fmt.Printf("Key pressed: %d\n", keyCode)
	audio.PlaySound()
}
