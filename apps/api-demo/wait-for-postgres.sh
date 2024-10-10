#!/bin/bash

# Script para esperar a que Postgres esté disponible
set -e

# Reemplaza las variables por las que estés usando
DB_HOST="${DB_HOST:-postgres}"
DB_USERNAME="${DB_USERNAME:-admin}"
DB_DATABASE="${DB_DATABASE:-managerDB}"

until nc -z "$DB_HOST" 5432; do
  >&2 echo "Postgres no está disponible, esperando..."
  sleep 1
done

>&2 echo "Postgres está disponible."
