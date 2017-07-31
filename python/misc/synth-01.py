#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330
# pylint: disable=C0326

## See https://stackoverflow.com/a/41333976 for installing pyaudio

import math
import pyaudio

DEFAULT_BITRATE = 44000 # Hz, number of frames per second/frameset
DEFAULT_LENGTH = .2      # seconds
FREQUENCY_C4 = 261.63   # 261.63=C4-note

def audio_open():
    PyAudio = pyaudio.PyAudio
    p = PyAudio()
    return p

def audio_close(p):
    p.terminate()

def sin_wave(frequency, length=DEFAULT_LENGTH, bitrate=DEFAULT_BITRATE):
    if frequency > bitrate:
        bitrate = frequency + 100

    frames_count = int(bitrate * length)
    frames_rest = frames_count % bitrate
    wave_data = ''

    for x in range(frames_count):
        phi = math.sin( x / ((bitrate / frequency) / math.pi))
        wave_data = wave_data + chr(int(phi * 127 + 128))

    for x in range(frames_rest):
        wave_data = wave_data + chr(128)

    return wave_data

def play_wave(p, wave_data, bitrate=DEFAULT_BITRATE):
    stream = p.open(format = p.get_format_from_width(1), 
        channels = 1, rate = bitrate, output = True)
    stream.write(wave_data)
    stream.stop_stream()
    stream.close()

#############################################################################
# Main
if __name__ == "__main__":

    pya = audio_open()

    play_wave(pya, sin_wave(FREQUENCY_C4 / 2))
    play_wave(pya, sin_wave(FREQUENCY_C4))

    audio_close(pya)