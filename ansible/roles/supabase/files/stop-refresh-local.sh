#!/bin/bash
set +x
set -e

COMPOSE_PROJECT_NAME='local'
export COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}

docker-compose --env-file ./local.env -f ./docker-compose-supabase-local.yml down


