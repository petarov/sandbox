package main

import (
	"fmt"
	"log"
	"time"
)

var (
	VERSION = "1.0"
)

func main() {
	fmt.Printf("*** BITTE ALLE IMPFEN! v%s\n", VERSION)

	ctx, err := init116117()
	if err != nil {
		log.Fatalf("client init error: %v", err)
	}

	fmt.Println("Fetch index ...")
	if err := GetIndex(ctx, nil); err != nil {
		log.Fatalf("index fetch error: %v", err)
	}

	fmt.Println("-----------------")

	fmt.Println("Fetch meta data ...")
	if err := GetMetaData(ctx); err != nil {
		log.Fatalf("centers fetch error: %v", err)
	}
	log.Printf("Ver: %v\n", ctx.Version)
	// log.Printf("Centers: %v\n", ctx.Centers)

	center := ctx.Centers["Brandenburg"][0]

	ctx2, err := init116117()
	time.Sleep(2 * time.Second)
	GetIndex(ctx2, center)

	fmt.Println("-----------------")

	time.Sleep(3 * time.Second)

	fmt.Println("Fetch termin ...")
	termin, err := GetTermin(ctx2, center)
	if err != nil {
		log.Fatalf("termin fetch error: %v", err)
	}
	log.Printf("Termin: %v\n", termin)
}
