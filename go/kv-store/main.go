package main

import (
	"flag"
	"fmt"
	"net/http"
	"sync"
)

const (
	PORT = 5607
)

var (
	cache = make(map[string]string)
	mutx  sync.RWMutex
)

func put(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
	} else {
		err := r.ParseForm()
		if err != nil {
			w.WriteHeader(400)
			w.Write([]byte("Error parsing form params"))
		} else {
			key := r.Form.Get("key")
			if len(key) == 0 {
				w.WriteHeader(400)
				w.Write([]byte("Missing key"))
			} else {
				value := r.Form.Get("value")
				mutx.Lock()
				cache[key] = value
				mutx.Unlock()

				w.WriteHeader(200)
				w.Write([]byte("OK"))
			}
		}
	}
}

func get(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(405)
	} else {
		keys, ok := r.URL.Query()["key"]
		if !ok || len(keys) < 1 {
			w.WriteHeader(400)
			w.Write([]byte("Missing key"))
		} else {
			mutx.RLock()
			v := cache[keys[0]]
			mutx.RUnlock()

			if len(v) == 0 {
				w.WriteHeader(404)
				w.Write([]byte(fmt.Sprintf("No value found for '%s'", keys[0])))
			} else {
				w.WriteHeader(200)
				w.Write([]byte(v))
			}
		}
	}
}

func main() {
	port := flag.Int("port", PORT, "port to listen to")
	flag.Parse()

	fmt.Println("*** Welcome to the mini key/value store! ***")
	fmt.Printf("*** Listening on: %d ***\n", *port)

	mux := http.NewServeMux()
	mux.HandleFunc("/put", put)
	mux.HandleFunc("/get", get)

	http.ListenAndServe(fmt.Sprintf(":%d", *port), mux)
}
