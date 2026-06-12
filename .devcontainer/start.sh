#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

if [ ! -f .env ] || [ ! -d vendor ] || [ ! -d node_modules ]; then
    echo "==> First-time setup required..."
    bash .devcontainer/setup.sh
fi

echo ""
echo "Starting TrialMatch (Laravel + Vite)..."
echo "  App:  port 8000 (open forwarded URL in browser)"
echo "  Vite: port 5173"
echo "  Demo: demo@trialmatch.test / password"
echo ""

trap 'kill 0 2>/dev/null' EXIT INT TERM

php artisan serve --host=0.0.0.0 --port=8000 &
npm run dev
