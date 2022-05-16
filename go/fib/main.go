package main

import (
	"flag"
	"fmt"
)

func fib(n int) int {
	if n == 0 {
		return 0
	} else if n == 1 {
		return 1
	}

	return fib(n-2) + fib(n-1)
}

func fibItr(n int) int {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		x, y = y, x+y
	}
	return x
}

func main() {
	var N int
	flag.IntVar(&N, "n", -1, "n F(N) term")
	flag.Parse()

	if N < 0 {
		flag.PrintDefaults()
		return
	}

	fmt.Printf("REC: %d\n", fib(N))
	fmt.Printf("Iter: %d\n", fibItr(N))
}
