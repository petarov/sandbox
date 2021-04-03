package main

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/cookiejar"
	"net/http/httputil"
	"time"

	"github.com/corpix/uarand"
)

var (
	SERVER_URL        = "https://www.impfterminservice.de"
	LEISTUNGSMERKMALE = "L920,L921,L922"
)

type Context struct {
	client       *http.Client
	Version      string
	Centers      map[string][]*Center
	Vaccinations []Vaccination
}

type AppointmentResponse struct {
	IsAvailable bool `json:"termineVorhanden"`
}

type Center struct {
	Name     string `json:"Zentrumsname"`
	PostCode string `json:"PLZ"`
	City     string `json:"Ort"`
	State    string `json:"Bundesland"`
	Url      string `json:"URL"`
	Address  string `json:"Adresse"`
}

type Vaccination struct {
	Qualification string `json:"qualification"`
	Name          string `json:"name"`
	TssName       string `json:"tssname"`
	Interval      int    `json:"interval"`
	Age           string `json:"age"`
}

func init116117() (context *Context, err error) {
	jar, err := cookiejar.New(nil)
	if err != nil {
		return nil, err
	}

	// apparently impfterminservice does not support http/2 (:facepalm)
	// tlsConfig := &tls.Config{
	// 	CipherSuites: []uint16{tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256},
	// 	NextProtos:   []string{http2.NextProtoTLS},
	// }
	httpClient := &http.Client{
		Timeout: 20 * time.Second,
		Jar:     jar,
	}
	// client.Transport = &http2.Transport{}

	return &Context{client: httpClient}, nil
}

func newRequest(url string) (*http.Request, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Accept-Encoding", "gzip")
	req.Header.Add("Cache-Control", "no-cache")
	req.Header.Add("Pragma", "no-cache")
	ua := uarand.GetRandom()
	req.Header.Add("User-Agent", ua)
	return req, nil
}

func getResponseBody(resp *http.Response) io.ReadCloser {
	var reader io.ReadCloser
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, _ = gzip.NewReader(resp.Body)
		defer reader.Close()
	default:
		reader = resp.Body
	}
	return reader
}

func isOk(resp *http.Response) bool {
	return resp.StatusCode < 400
}

func printCookies(resp *http.Response) {
	fmt.Printf("|-> %s\n", resp.Request.URL)
	for _, ck := range resp.Cookies() {
		fmt.Printf("|---> %s \n", ck.Raw)
	}
}

func GetIndex(context *Context, center *Center) error {
	url := fmt.Sprintf("https://www.impfterminservice.de/impftermine")
	if center != nil {
		url = fmt.Sprintf("%s/impftermine/service?plz=%s", center.Url, center.PostCode)
	}

	req, err := newRequest(url)
	if err != nil {
		return err
	}

	resp, err := context.client.Do(req)
	if err != nil {
		return err
	}
	printCookies(resp)

	if !isOk(resp) {
		return fmt.Errorf("http error index / status=%d", resp.StatusCode)
	}

	return nil
}

func GetMetaData(context *Context) error {
	// --- centers ---
	req, err := newRequest(fmt.Sprintf("%s/assets/static/impfzentren.json", SERVER_URL))
	if err != nil {
		return err
	}

	resp, err := context.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// printCookies(resp)

	if !isOk(resp) {
		return fmt.Errorf("http error centers / status=%d", resp.StatusCode)
	}

	context.Centers = make(map[string][]*Center)
	if err := json.NewDecoder(getResponseBody(resp)).Decode(&context.Centers); err != nil {
		return err
	}

	// --- vaccines ---
	req, err = newRequest(fmt.Sprintf("%s/assets/static/its/vaccination-list.json", SERVER_URL))
	if err != nil {
		return err
	}

	resp, err = context.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// printCookies(resp)

	if !isOk(resp) {
		return fmt.Errorf("http error vaccinations / status=%d", resp.StatusCode)
	}

	if err := json.NewDecoder(getResponseBody(resp)).Decode(&context.Vaccinations); err != nil {
		return err
	}

	// --- version ---
	req, err = newRequest(fmt.Sprintf("%s/rest/version", SERVER_URL))
	if err != nil {
		return err
	}

	resp, err = context.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// printCookies(resp)

	if !isOk(resp) {
		return fmt.Errorf("http error version / status=%d", resp.StatusCode)
	}

	bytes, err := io.ReadAll(resp.Body)
	context.Version = string(bytes)

	return nil
}

func GetTermin(context *Context, center *Center) (*AppointmentResponse, error) {
	// --- sensors ---
	req, err := newRequest(fmt.Sprintf("%s/resource/00432b0b56rn202da2c3c9870b06fac7", center.Url))
	if err != nil {
		return err
	}

	resp, err = context.client.Do(req)
	if err != nil {
		return err
	}
	if !isOk(resp) {
		return fmt.Errorf("http error version / status=%d", resp.StatusCode)
	}

	// --- termin ---
	req, err = newRequest(fmt.Sprintf("%s/rest/suche/termincheck?plz=%s&leistungsmerkmale=%s",
		center.Url, center.PostCode, LEISTUNGSMERKMALE))
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")

	for _, ck := range context.client.Jar.Cookies(req.URL) {
		// fmt.Printf("CK:  %s = %s (%s)\n", ck.Name, ck.Value, ck.Domain)
		req.AddCookie(ck)
	}

	reqOut, err := httputil.DumpRequest(req, true)
	fmt.Println(string(reqOut))

	resp, err := context.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	rout, _ := httputil.DumpResponse(resp, true)
	fmt.Println(string(rout))

	if !isOk(resp) {
		return nil, fmt.Errorf("http error termin / status=%d", resp.StatusCode)
	}

	result := &AppointmentResponse{}
	if err := json.NewDecoder(getResponseBody(resp)).Decode(result); err != nil {
		return nil, err
	}

	return result, nil
}
