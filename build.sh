#!/bin/sh
origin=`pwd`
here=`dirname ${0}`
here=`cd ${here};pwd`
cd ${here}
echo "downloading dependencies package."
PATH="${PATH}:${here}/bin"
npm install
echo "building portfolio site."
PATH="${PATH}:${here}/node_modules/.bin"
rm -rf dist&& tsc && node store_bundle/store_src/main.js && ng build --prod && node store_bundle/store_src/send/main.js ${@}
cd ${origin}
echo "complete building."
