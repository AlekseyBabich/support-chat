#!/bin/bash
set +x
set -e

ENV="prod"

echo "env: ${1}"


docker restart pokerswap-telegram-bot-${ENV}
docker restart pokerswap-webapp-${ENV}
docker restart pokerswap-webservice-${ENV}

docker run --rm --network pswp_network --env-file webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-db-migrate
docker run --rm --network pswp_network --env-file webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-db-init
docker run --rm --network pswp_network --env-file webservice-${ENV}.env --entrypoint yarn  -ti ghcr.io/pswp/pokerswap/webservice:latest pokerswap-webservice-room-agents-init
