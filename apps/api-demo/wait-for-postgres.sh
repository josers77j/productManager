#!/bin/bash

# Script para esperar a que Postgres esté disponible
set -e

# Variables de entorno
DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"

echo "Esperando a que Postgres esté disponible en $DB_HOST:$DB_PORT..."

# Intentar conectarse al puerto de Postgres
until nc -z "$DB_HOST" "$DB_PORT"; do
  >&2 echo "Postgres no está disponible, esperando..."
  sleep 1
done

>&2 echo "Postgres está disponible en $DB_HOST:$DB_PORT, comenzando la aplicación."
exec "$@"
