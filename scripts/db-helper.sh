#!/bin/bash

# Database helper script
# Automatically selects the correct Prisma schema based on DATABASE_PROVIDER

PROVIDER=${DATABASE_PROVIDER:-sqlite}
SCHEMA="schema.prisma"

if [ "$PROVIDER" = "postgresql" ]; then
    SCHEMA="schema.postgres.prisma"
fi

SCHEMA_PATH="prisma/$SCHEMA"

echo "Using database provider: $PROVIDER"
echo "Using schema: $SCHEMA_PATH"
echo ""

case "$1" in
    generate)
        echo "Generating Prisma Client..."
        pnpm prisma generate --schema="$SCHEMA_PATH"
        ;;
    migrate)
        echo "Running migrations (dev mode)..."
        pnpm prisma migrate dev --schema="$SCHEMA_PATH"
        ;;
    migrate:deploy)
        echo "Deploying migrations (production mode)..."
        pnpm prisma migrate deploy --schema="$SCHEMA_PATH"
        ;;
    studio)
        echo "Opening Prisma Studio..."
        pnpm prisma studio --schema="$SCHEMA_PATH"
        ;;
    seed)
        echo "Seeding database..."
        pnpm db:seed
        ;;
    *)
        echo "Usage: $0 {generate|migrate|migrate:deploy|studio|seed}"
        echo ""
        echo "Commands:"
        echo "  generate       - Generate Prisma Client"
        echo "  migrate        - Create and apply migrations (dev)"
        echo "  migrate:deploy - Apply migrations (production)"
        echo "  studio         - Open Prisma Studio"
        echo "  seed           - Seed the database"
        echo ""
        echo "Set DATABASE_PROVIDER=postgresql for PostgreSQL, or leave unset for SQLite"
        exit 1
        ;;
esac

