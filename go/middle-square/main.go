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

var (
	nsize   = 0
	nleft   = 0
	nright  = 0
	known   = make(set)
	counter = 0
)

func getSeed() (num uint64, err error) {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter a 2 to 10 digit number: ")
	text, err := reader.ReadString('\n')
	if err != nil {
		return 0, err
	}
	text = strings.Trim(text, " \n")

	nsize = len(text)
	if nsize < 2 || nsize > 10 {
		return 0, errors.New("not a 2 to 10 digit number")
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

	nleft = nsize - (nsize >> 1)
	nright = nsize + (nsize >> 1)

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
		num, _ = strconv.ParseUint((fmt.Sprintf("%0*d", (nsize * 2), num*num)[nleft:nright]), 10, 64)
		fmt.Printf("[%d] = %d\n", counter, num)
	}

}
