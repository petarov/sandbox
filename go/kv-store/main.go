// A simple PoC key/value store that works with strings
package main

import (
	"flag"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"runtime"
	"sync"
)

const (
	PORT = 5607
)

var (
	cache = make(map[string]string)
	mtx   sync.RWMutex
)

func put(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Error parsing form params", http.StatusBadRequest)
	} else {
		for k, v := range r.Form {
			if len(k) == 0 {
				http.Error(w, "Missing key", http.StatusBadRequest)
				return
			}

			// go func(key string, val string) {
			// lockChn <- struct{}{}
			mtx.Lock()
			cache[k] = v[0]
			mtx.Unlock()
			// <-lockChn
			// }(k, v[0])
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}
}

func get(w http.ResponseWriter, r *http.Request) {
	keys := r.URL.Query()["key"]
	if len(keys) > 1 {
		found := 0
		for _, key := range keys {
			value, ok := cache[key]

			if ok {
				if found == 0 {
					w.WriteHeader(http.StatusOK)
				}
				found += 1
				w.Write([]byte(fmt.Sprintf("%s;%s\n", url.QueryEscape(key), url.QueryEscape(value))))
			}
		}

		if found == 0 {
			http.Error(w, "No values found for specified keys", http.StatusNotFound)
		}
	} else if len(keys) == 0 {
		http.Error(w, fmt.Sprintf("No keys specified"), http.StatusNotFound)
	} else {
		v, ok := cache[keys[0]]

		if ok {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(url.QueryEscape(v)))
		} else {
			http.Error(w, fmt.Sprintf("No value found for '%s'", keys[0]),
				http.StatusNotFound)
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
	fmt.Printf("*** Listening on: %d, CPUS: %d ***\n", *port, runtime.GOMAXPROCS(-1))

	mux := http.NewServeMux()
	mux.HandleFunc("/", router)

	if err := http.ListenAndServe(fmt.Sprintf(":%d", *port), mux); err != nil {
		fmt.Printf("%v\n", err)
		os.Exit(-1)
	}
}
