package audio

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/speaker"
	"github.com/faiface/beep/wav"
)

var buffer *beep.Buffer = nil

func InitPlayer() {
	f, err := os.Open("118513__thefsoundman__punch-02.wav")
	if err != nil {
		log.Fatal(err)
	}

	streamer, format, err := wav.Decode(f)
	if err != nil {
		log.Fatal(err)
	}
	// defer streamer.Close()

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/60))

	buffer = beep.NewBuffer(format)
	buffer.Append(streamer)
	streamer.Close()

	fmt.Println("**AUDIO LOADED")
}

func PlaySound() {
	if buffer != nil {
		punch := buffer.Streamer(0, buffer.Len())
		speaker.Play(punch)

		// done := make(chan bool)
		// speaker.Play(beep.Seq(punch, beep.Callback(func() {
		// 	done <- true
		// })))

		// <-done
	}
}
