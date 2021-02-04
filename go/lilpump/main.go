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
	Method       string
	TargetsParam string
	TargetPid    int
	TargetAid    int
	Targets      []string
	Pumps        int
	Chance       int
	MinInterval  int
	MaxInterval  int
)

func init() {
	flag.StringVar(&TargetURL, "url", "", "Target url")
	flag.StringVar(&Method, "m", "", "Pump method")
	flag.StringVar(&TargetsParam, "t", "", "Targets")
	flag.IntVar(&TargetPid, "pid", 0, "Target pid")
	flag.IntVar(&TargetAid, "aid", 0, "Target aid")
	flag.IntVar(&Pumps, "a", 10, "How many pumps?")
	flag.IntVar(&Chance, "c", 75, "Chance")
	flag.IntVar(&MinInterval, "min", 3, "min sec")
	flag.IntVar(&MaxInterval, "max", 10, "max sec")
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
	if len(Method) <= 0 {
		flag.PrintDefaults()
		log.Fatalln("No method specified.")
	}

	rand.Seed(time.Now().UnixNano())

	parts := strings.Split(TargetsParam, ",")
	ids := make([]int, len(parts))
	for i, p := range parts {
		id, _ := strconv.Atoi(p)
		ids[i] = id
	}

	client, _ := getClient()
	sem := make(chan byte, 4)
	var wg sync.WaitGroup

	for idx := 0; idx < Pumps; idx++ {
		switch Method {
		case "pump1":
			if len(TargetsParam) <= 0 {
				log.Fatalln("No targets specified.")
			}
			for _, id := range ids {
				sem <- 1
				wg.Add(1)
				go func(cid int) {
					v := false
					ch := rand.Intn(100)
					if ch <= Chance {
						v = true
					}
					fmt.Printf("%s ID=%d  ch=%d  v=%t\n", Method, cid, ch, v)
					pump1(client, cid, v)
					time.Sleep(time.Duration(rand.Intn(MaxInterval)+MinInterval) * time.Second)
					<-sem
					wg.Done()
				}(id)
			}
		case "pump2":
			if TargetPid <= 0 || TargetAid <= 0 {
				log.Fatalln("No targets specified.")
			}
			sem <- 1
			wg.Add(1)
			go func() {
				fmt.Printf("%s %d=%d \n", Method, TargetPid, TargetAid)
				pump2(client, TargetPid, TargetAid)
				time.Sleep(time.Duration(rand.Intn(MaxInterval-MinInterval)+MinInterval) * time.Second)
				<-sem
				wg.Done()
			}()
		default:
			log.Fatalf("Wrong pump: %s\n", Method)
		}
	}
	wg.Wait()
	close(sem)

	fmt.Printf("Done. Pumps=%d\n", Pumps)
}

func pump1(client *http.Client, cid int, yes bool) {
	data := url.Values{}
	data.Set("comment"+"_id", strconv.Itoa(cid))
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

func pump2(client *http.Client, pid int, aid int) {
	data := url.Values{}
	data.Set("poll"+"_id", strconv.Itoa(pid))
	data.Set("poll"+"_answer", strconv.Itoa(aid))
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

	//rout, _ := httputil.DumpResponse(resp, true)
	//fmt.Println(string(rout))
}
