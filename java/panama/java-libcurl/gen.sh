#!/bin/sh

$JAVA_HOME/bin/jextract -t org.unix -L /usr/lib -lcurl --record-library-path /usr/include/curl/curl.h -o curl.jar
