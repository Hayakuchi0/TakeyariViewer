#!/bin/bash
here=`dirname ${0}`
here=`cd ${here};pwd`
function build_takeyari()
{
  tsc && node store_bundle/store_src/main.js && ng build --prod
}
function exist_check()
{
  if !(type ${1} > /dev/null 2>&1)
  then
    if (type "apt" > /dev/null 2>&1)
    then
      echo "install ${2} now."
      sudo apt install ${2}
      echo "installed ${2}"
    fi
    if (type "yum" > /dev/null 2>&1)
    then
      echo "install ${3} now."
      sudo yum install ${3}
      echo "installed ${3}"
    fi
  fi
}
exist_check node nodejs nodejs
exist_check npm npm npm
npm install
PATH="${PATH}:${here}/node_modules/.bin"
build_takeyari
