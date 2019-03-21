#!/bin/sh

tsc && node store_bundle/store_src/main.js && ng build --prod
