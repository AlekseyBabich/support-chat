#!/bin/bash
set +x
set -e

DATE=$(date '+%Y%m%dT%H:%M:%S')
PWD=$(pwd)
BAK_ROOT_NAME=volumes_backup
BAK_ROOT=${PWD}/${BAK_ROOT_NAME}
BAK_NAME=volumes_${DATE}
BAK=${BAK_ROOT}/${BAK_NAME}

ENV=""

if [ -z "${1}" ]; then
    echo "arg must be local, test or prod"
    exit 1
else
    case ${1} in
      "test")
          ENV="test"
          ;;
      "prod")
          ENV="prod"
          ;;
      *)
          echo "unsupported env"
          exit 1
          ;;
    esac
fi

echo "env: ${1}"


docker-compose -f docker-compose-supabase-db.yml -f docker-compose-supabase-services.yml down
docker-compose -f docker-compose-supabase-services.yml pull

if [ ! -f "${BAK}.zip" ];
then
    echo "Archiving ${BAK_ROOT_NAME}/${BAK_NAME}.zip"
    mkdir -p ${BAK}

    cp -rf volumes/* ${BAK}
    rm -rf volumes/db/data/*
    rm -rf volumes/storage/*

    cd ${BAK_ROOT}
    zip -rq ${BAK_NAME}.zip ${BAK_NAME}
    rm -rf ${BAK}

    cd ${PWD}
else
    echo "${BAK_ROOT_NAME}/${BAK_NAME}.zip already exists, skipping archive"
fi

cd ..

docker-compose -f docker-compose-supabase-db.yml up -d
while ! nc -z 127.0.0.1 5432; do sleep 1; done;
docker-compose -f docker-compose-supabase-services.yml up -d

docker restart pokerswap-telegram-bot-${ENV}
docker restart pokerswap-webapp-${ENV}
docker restart pokerswap-webservice-${ENV}

docker run --rm --network pswp_network --env-file ../services/webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-db-migrate
docker run --rm --network pswp_network --env-file ../services/webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-db-init
docker run --rm --network pswp_network --env-file ../services/webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-room-agents-init
