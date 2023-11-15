#!/bin/bash

SCRIPTS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="${SCRIPTS_DIR}/.."
APPS_DIR="${ROOT_DIR}/apps"

cd $APPS_DIR
APP_NAMES=$(ls -d *)
cd $ROOT_DIR

for APP in $APP_NAMES
do
  PROJECT_OPTION="apps/${APP}/tsconfig.app.json"
  TS_NODE="./node_modules/.bin/ts-node --project ${PROJECT_OPTION} -r tsconfig-paths/register"
  MIGRATION_PATH="apps/${APP}/src/infrastructure/persistent/pg/migrations/index.ts"

  if [ -e ${MIGRATION_PATH} ]; then
    $TS_NODE ${MIGRATION_PATH} $1
  else
    echo "Skip ${APP}, no migration file"
  fi
done


