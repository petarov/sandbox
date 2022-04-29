package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"net"
	"os"
)

var (
	host string
	port int
)

func main() {
	flag.StringVar(&host, "host", "localhost", "Echo server listen address")
	flag.IntVar(&port, "port", 5678, "Echo server listen port")
	flag.Parse()

	conn, err := net.Dial("tcp", fmt.Sprintf("%s:%d", host, port))
	if err != nil {
		log.Fatalln(fmt.Errorf("Connection error : %w", err))
	}
	defer conn.Close()

	fmt.Println("*** Welcome to the go echo-client ***")

	for {
		fmt.Print("> ")
		input := bufio.NewScanner(os.Stdin)
		input.Scan()
		line := input.Text()

		if line == "quit" || line == "exit" {
			break
		}

		_, err = conn.Write([]byte(line + "\r\n"))
		if err != nil {
			log.Fatalln(fmt.Errorf("Write error : %w", err))
		}

		buffer := make([]byte, 1024)
		n, err := conn.Read(buffer)
		if err != nil {
			log.Fatalln(fmt.Errorf("Read error : %w", err))
		}
		if n > 0 {
			fmt.Println(string(buffer[:n]))
		}
	}

	fmt.Println("Goodbye!")
}
