#!/usr/bin/env sh
set -eu

# Prisma schema changes and seeds should use the direct PostgreSQL connection when
# the provider exposes one. Fall back to DATABASE_URL for local/self-hosted setups.
if [ -n "${DIRECT_URL:-}" ]; then
  export DATABASE_URL="$DIRECT_URL"
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "[Prisma] DATABASE_URL/DIRECT_URL not set; skipping database command."
  exit 0
fi

exec npx prisma "$@"
