package app

import (
	"fmt"
	"runtime"
	"unsafe"

	"github.com/petarov/punch-line/app/darwin"
)

type KeyDownCallback func(uint)

type Application struct {
	Ptr       unsafe.Pointer
	OnKeyDown KeyDownCallback
}

func NewApplication() (app *Application, err error) {
	app = new(Application)

	switch rt := runtime.GOOS; rt {
	case "darwin":
		app.Ptr = darwin.CreateApplication()
	//case "linux":
	// TODO
	default:
		return nil, fmt.Errorf("%s is not a supported runtime!", rt)
	}

	return app, nil
}

func (this *Application) Run() (int, error) {
	switch rt := runtime.GOOS; rt {
	case "darwin":
		return darwin.RunApplication(this.Ptr), nil
	//case "linux":
	// TODO
	default:
		return -1, fmt.Errorf("%s is not a supported runtime!", rt)
	}
}
