package main

import (
	"crypto/md5"
	"crypto/tls"
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/corpix/uarand"
	"golang.org/x/net/http2"
)

var (
	TargetURL    string
	TargetsParam string
	Targets      []string
	Pumps        int
	Chance       int
)

func init() {
	flag.StringVar(&TargetURL, "url", "", "Target url")
	flag.StringVar(&TargetsParam, "t", "", "Target ids")
	flag.IntVar(&Pumps, "p", 10, "How many pumps?")
	flag.IntVar(&Chance, "c", 75, "Chance")
}

func getClient() (client *http.Client, err error) {
	tlsConfig := &tls.Config{}
	client = &http.Client{Timeout: 20 * time.Second}
	client.Transport = &http2.Transport{TLSClientConfig: tlsConfig}

	return client, nil
}

func main() {
	fmt.Println("Esketit!!!")
	flag.Parse()

	if len(TargetURL) <= 0 {
		flag.PrintDefaults()
		log.Fatalln("No target url specified.")
	}
	if len(TargetsParam) <= 0 {
		log.Fatalln("No targets specified.")
	}

	rand.Seed(time.Now().UnixNano())

	parts := strings.Split(TargetsParam, ",")
	ids := make([]int, len(parts))
	for i, p := range parts {
		id, _ := strconv.Atoi(p)
		ids[i] = id
	}

	client, _ := getClient()
	sem := make(chan byte, 3)
	var wg sync.WaitGroup

	for idx := 0; idx < Pumps; idx++ {
		for _, id := range ids {
			sem <- 1
			wg.Add(1)
			go func(cid int) {
				v := false
				if rand.Intn(100) <= Chance {
					v = true
				}
				fmt.Printf("PUMP ID=%d  v=%t\n", cid, v)
				pump1(client, cid, v)
				time.Sleep(3 * time.Second)
				<-sem
				wg.Done()
			}(id)
		}
	}

	wg.Wait()
	close(sem)

	fmt.Printf("Done. Pumps=%d\n", Pumps)
}

func pump1(client *http.Client, cid int, yes bool) {
	data := url.Values{}
	data.Set("comment_id", strconv.Itoa(cid))
	if yes {
		data.Set("mark", "plus")
	} else {
		data.Set("mark", "minus")
	}
	data.Set("MIME Type", "application/x-www-form-urlencoded")

	req, _ := http.NewRequest(http.MethodPost, TargetURL, strings.NewReader(data.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))
	req.Header.Add("User-Agent", uarand.GetRandom())
	req.Header.Add("X-Requested-With", "XMLHttpRequest")

	tok := make([]byte, 64)
	rand.Read(tok)
	hash := fmt.Sprintf("%x", md5.Sum(tok))
	req.Header.Add("Cookie", fmt.Sprintf("ruid=_%s", hash))

	// reqOut, err := httputil.DumpRequest(req, true)
	// fmt.Println(string(reqOut))

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error response: %s", err)
	}
	defer resp.Body.Close()

	// rout, _ := httputil.DumpResponse(resp, true)
	// fmt.Println(string(rout))
}
