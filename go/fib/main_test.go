package main

import (
	"flag"
	"testing"
)

var term = flag.Int("term", 0, "F(n) terms")

func BenchmarkFibRec(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fib(*term)

	}
}

func BenchmarkFibIter(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fibItr(*term)
	}
}
