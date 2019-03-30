#!/bin/sh
echo "build start!"
origin=`pwd`
here=`dirname ${0}`
here=`cd ${here};pwd`
cd ${here}
echo "downloading dependencies package."
PATH="${PATH}:${here}/bin"
npm install
echo "building portfolio site."
PATH="${PATH}:${here}/node_modules/.bin"
tsc && node store_bundle/store_src/main.js && ng build --prod
cd ${origin}
echo "complete building."
