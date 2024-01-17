#!/bin/bash

if [[ -z $1 ]];
then
    echo "Required parameter – service name"
    exit
fi

APP=$1
SCRIPTS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="${SCRIPTS_DIR}/.."

cd $ROOT_DIR

PROJECT_OPTION="apps/${APP}/tsconfig.app.json"
TS_NODE="./node_modules/.bin/ts-node --project ${PROJECT_OPTION} -r tsconfig-paths/register"
SEED_PATH="apps/${APP}/src/infrastructure/persistence/pg/seeders/index.ts"

if ! [ -e ${SEED_PATH} ]; then
  echo "Exit, no seed file"
  exit
fi

$TS_NODE ${SEED_PATH}
