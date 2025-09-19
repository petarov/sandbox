package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

const (
	version = "1.0.0"
)

var (
	host = flag.String("host", "localhost", "host to connect to/listen on")
	port = flag.Int("port", 24240, "port number to connect to/listen on")
)

func main() {
	out := flag.CommandLine.Output()
	flag.Usage = func() {
		fmt.Fprintf(out, "Usage: %s [-port <port] [-host <host>]\n\n", os.Args[0])
		fmt.Fprintf(out, "Rearrange your GitHub stars using MCP.\n\n")
		flag.PrintDefaults()
		os.Exit(1)
	}
	flag.Parse()

	token := os.Getenv("GITHUB_TOKEN")
	if len(token) == 0 {
		fmt.Fprint(out, "Missing `GITHUB_TOKEN` environment variable.")
		os.Exit(1)
	}

	ctx := context.Background()
	ghCreateClient(ctx, token)

	server := mcp.NewServer(&mcp.Implementation{
		Name:    "starghlist-server",
		Version: version,
	}, nil)

	mcp.AddTool(server, &mcp.Tool{
		Name:        "getStars",
		Description: "Get the users's starred repositories",
	}, GetStars)

	handler := mcp.NewStreamableHTTPHandler(func(req *http.Request) *mcp.Server {
		return server
	}, nil)

	handlerWithLogging := loggingHandler(handler)

	listenAddress := fmt.Sprintf("%s:%d", *host, *port)
	log.Printf("MCP server listening on %s", listenAddress)

	if err := http.ListenAndServe(listenAddress, handlerWithLogging); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
