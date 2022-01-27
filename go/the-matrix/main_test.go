package main

import (
	"testing"
)

func BenchmarkStruct(b *testing.B) {
	for i := 0; i < b.N; i++ {
		m.mul(id2)
	}
}

func BenchmarkType(b *testing.B) {
	for i := 0; i < b.N; i++ {
		pm.mul(pid2)
	}
}
