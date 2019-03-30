#!/bin/bash
echo "build start!"
origin=`pwd`
here=`dirname ${0}`
here=`cd ${here};pwd`
cd ${here}
function build_takeyari()
{
  tsc && node store_bundle/store_src/main.js && ng build --prod
}
PATH="${PATH}:${here}/bin"
echo "downloading dependencies package."
npm install
echo "building portfolio site."
PATH="${PATH}:${here}/node_modules/.bin"
build_takeyari
cd ${origin}
echo "complete building."
