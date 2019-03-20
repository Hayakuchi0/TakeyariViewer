#!/bin/sh

encode="utf-8"
if [ 0 -lt ${#} ];
then
  encode=${1}
fi
tsc
node store_bundle/store_src/main.js ${encode}
ng build --prod
