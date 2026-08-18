#!/usr/bin/env sh
set -eu

sh scripts/prisma-with-direct-url.sh db push --skip-generate

if [ "${SEED_DEMO_DATA:-false}" = "true" ]; then
  echo "[TAQA HOME] Seeding demo catalog..."
  SEED_DEMO_DATA=true sh scripts/prisma-with-direct-url.sh db seed
else
  echo "[TAQA HOME] Demo catalog seed skipped. Set SEED_DEMO_DATA=true in Vercel to seed it."
fi
