#!/bin/bash

docker network create pswp_network --attachable

docker-compose --env-file local.env -f docker-compose-supabase-local.yml up -d
