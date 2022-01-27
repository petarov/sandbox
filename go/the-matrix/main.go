package main

import "fmt"

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

func main() {

	_ = Matrix{
		3,
		[]int{1, 0, 0},
		[]int{0, 1, 0},
		[]int{0, 0, 1},
	}

	id2 := Matrix{
		3,
		[]int{2, 0, 0},
		[]int{0, 2, 0},
		[]int{0, 0, 2},
	}

	m1 := Matrix{
		3,
		[]int{1, 2, 3},
		[]int{4, 5, 6},
		[]int{7, 8, 9},
	}

	fmt.Printf("%+v\n", m1.mul(id2))

}
