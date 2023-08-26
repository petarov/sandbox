package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/vartanbeno/go-reddit/v2/reddit"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

const (
	DEFAULT_PORT         = 7095
	DEFAULT_REFRESH_MINS = 60 * 24
	HEART                = "\u2764"
	PROJECT_ID           = ""
)

var (
	ctx = context.Background()
)

// indexHandler responds to requests with our greeting.
func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	fmt.Fprint(w, "Loading reddit posts ...")

	posts, _, err := reddit.DefaultClient().Subreddit.NewPosts(ctx, "rabattcodes",
		&reddit.ListOptions{
			Limit: 10,
		},
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
	} else {
		fsClient := createClient()
		defer fsClient.Close()

		for _, post := range posts {
			fmt.Fprint(w, post.Title)
			_, _, err := fsClient.Collection("reddit").Add(ctx, map[string]interface{}{
				"title": post.Title,
				"born":  1815,
			})
			if err != nil {
				log.Fatalf("Failed adding alovelace: %v", err)
			}
		}
	}
}

func createClient() *firestore.Client {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: PROJECT_ID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	//defer client.Close()
	return client
}

func main() {
	http.HandleFunc("/", indexHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
