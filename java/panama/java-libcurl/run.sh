#!/bin/sh

javac -cp curl.jar Main.java
java -cp curl.jar:. Main $@
