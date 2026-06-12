#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

if ! php -r 'exit(version_compare(PHP_VERSION, "8.4.1", ">=") ? 0 : 1);'; then
    echo "ERROR: PHP 8.4.1+ required but found $(php -r 'echo PHP_VERSION;')"
    echo "Run: bash .devcontainer/install-tools.sh"
    exit 1
fi

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
