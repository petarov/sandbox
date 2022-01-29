# KV-Store

Minimalistic HTTP key/value Store.

## Usage

To put a value into the store:

    curl -X POST -d "name=maxmustermann" "http://127.0.0.1:5607"

To get a value from the store:

    curl -v -X GET "http://127.0.0.1:5607/?key=name"

To put multiple values into the store:

    curl -X POST -d "name=maxmustermann&age=23&occupation=Engineer" "http://127.0.0.1:5607"