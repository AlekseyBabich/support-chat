#!/bin/bash
set +x
set -e

COMPOSE_PROJECT_NAME='local'
export COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}

docker-compose --env-file ./local.env -f ./docker-compose-supabase-local.yml down

# backup using approach https://stackoverflow.com/a/73082374
docker volume rm ${COMPOSE_PROJECT_NAME}_pswp_pg_data_backup ${COMPOSE_PROJECT_NAME}_pswp_storage_backup || true
docker run --rm -v ${COMPOSE_PROJECT_NAME}_pswp_pg_data:/original -v ${COMPOSE_PROJECT_NAME}_pswp_pg_data_backup:/backup node:18 bash -c "cp -R /original/* /backup/" || true
docker run --rm -v ${COMPOSE_PROJECT_NAME}_pswp_storage:/original -v ${COMPOSE_PROJECT_NAME}_pswp_storage_backup:/backup node:18 bash -c "cp -R /original/* /backup/" || true
docker volume rm ${COMPOSE_PROJECT_NAME}_pswp_pg_data ${COMPOSE_PROJECT_NAME}_pswp_storage || true

docker network create pswp_network --attachable || true
docker-compose --env-file ./local.env -f ./docker-compose-supabase-local.yml up -d

while ! nc -z 127.0.0.1 5432; do sleep 1; done;
