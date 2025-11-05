#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U "${POSTGRES_USER:-likeeno}"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is ready!"

echo "Running database migrations..."
pnpm prisma migrate deploy || echo "Migration failed or already applied"

echo "Starting application..."
exec node server.js

