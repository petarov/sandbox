// middle-square method is a method invented by John von Neumann for generating pseudorandom numbers
// https://en.wikipedia.org/wiki/Middle-square_method

package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type set map[uint64]int

func getSeed() (num uint64, err error) {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter a 4-digit number: ")
	text, err := reader.ReadString('\n')
	text = strings.Trim(text, " \n")
	if len(text) > 4 {
		return 0, errors.New("not a 4-digit number")
	}
	if err != nil {
		return 0, err
	}
	num, err = strconv.ParseUint(text, 10, 64)
	return num, err
}

func main() {
	num, err := getSeed()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	var (
		known   = make(set)
		counter = 0
	)

	fmt.Println("Generating ...")

	for {
		idx, ok := known[num]
		if ok {
			fmt.Printf("** repeat detected after (%d) steps\n", counter-1)
			fmt.Printf("** %d found at [%d]\n", num, idx)
			break
		}
		known[num] = counter
		counter++
		num, _ = strconv.ParseUint((fmt.Sprintf("%08d", num*num)[2:6]), 10, 64)
		fmt.Printf("[%d] = %d\n", counter, num)
	}

}
