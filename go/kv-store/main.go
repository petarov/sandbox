// A simple PoC key/value store that works with strings
package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
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
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Error parsing form params", http.StatusBadRequest)
	} else {
		mutx.Lock()
		defer mutx.Unlock()
		for k, v := range r.Form {
			if len(k) == 0 {
				http.Error(w, "Missing key", http.StatusBadRequest)
				return
			}
			cache[k] = v[0]
		}
	}
}

func get(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["key"]
	if !ok || len(keys) < 1 {
		http.Error(w, "Missing key", http.StatusBadRequest)
	} else {
		mutx.RLock()
		v := cache[keys[0]]
		mutx.RUnlock()

		if len(v) == 0 {
			http.Error(w, fmt.Sprintf("No value found for '%s'", keys[0]), http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(v))
		}
	}
}

func router(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		get(w, r)
	} else if r.Method == "POST" || r.Method == "PUT" {
		put(w, r)
	} else {
		http.Error(w, "", http.StatusMethodNotAllowed)
	}
}

func main() {
	port := flag.Int("port", PORT, "port to listen to")
	flag.Parse()

	fmt.Println("*** Welcome to the mini key/value store! ***")
	fmt.Printf("*** Listening on: %d ***\n", *port)

	mux := http.NewServeMux()
	mux.HandleFunc("/", router)

	if err := http.ListenAndServe(fmt.Sprintf(":%d", *port), mux); err != nil {
		fmt.Printf("%v\n", err)
		os.Exit(-1)
	}
}
