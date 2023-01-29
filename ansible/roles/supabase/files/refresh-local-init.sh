#!/bin/bash
set +x
set -e

cd ../../../../
yarn pokerswap-webservice-db-migrate
yarn pokerswap-webservice-db-init
yarn pokerswap-webservice-room-agents-init