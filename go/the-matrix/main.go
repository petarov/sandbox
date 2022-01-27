// main.go
package main

import (
	"fmt"
)

type Matrix struct {
	Size int
	X    []int
	Y    []int
	Z    []int
}

func (m *Matrix) mul(n Matrix) *Matrix {
	m.X = []int{
		n.X[0]*m.X[0] + n.X[1]*m.Y[0] + n.X[2]*m.Z[0],
		n.X[0]*m.X[1] + n.X[1]*m.Y[1] + n.X[2]*m.Z[1],
		n.X[0]*m.X[2] + n.X[1]*m.Y[2] + n.X[2]*m.Z[2],
	}
	m.Y = []int{
		n.Y[0]*m.X[0] + n.Y[1]*m.Y[0] + n.Y[2]*m.Z[0],
		n.Y[0]*m.X[1] + n.Y[1]*m.Y[1] + n.Y[2]*m.Z[1],
		n.Y[0]*m.X[2] + n.Y[1]*m.Y[2] + n.Y[2]*m.Z[2],
	}
	m.Z = []int{
		n.Z[0]*m.X[0] + n.Z[1]*m.Y[0] + n.Z[2]*m.Z[0],
		n.Z[0]*m.X[1] + n.Z[1]*m.Y[1] + n.Z[2]*m.Z[1],
		n.Z[0]*m.X[2] + n.Z[1]*m.Y[2] + n.Z[2]*m.Z[2],
	}
	return m
}

type MatrixPure [][]int

func (m *MatrixPure) mul(n MatrixPure) *MatrixPure {
	r := MatrixPure{
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
	}

	src := *m
	for rn := range n {
		for cm := range src[0] {
			for rm := range src {
				r[rn][cm] += n[rn][rm] * src[rm][cm]
			}
		}
	}

	*m = r

	return m
}

var (
	id2 = Matrix{
		3,
		[]int{2, 0, 0},
		[]int{0, 2, 0},
		[]int{0, 0, 2},
	}
	m = Matrix{
		3,
		[]int{1, 2, 3},
		[]int{4, 5, 6},
		[]int{7, 8, 9},
	}
	pid2 = MatrixPure{
		{2, 0, 0},
		{0, 2, 0},
		{0, 0, 2},
	}

	pm = MatrixPure{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
)

func main() {
	fmt.Printf("%+v\n", m.mul(id2))
	fmt.Printf("%+v\n", pm.mul(pid2))
}
