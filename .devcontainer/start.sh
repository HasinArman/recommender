#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

if [ ! -f .env ] || [ ! -d vendor ] || [ ! -d node_modules ]; then
    echo "==> First-time setup required..."
    bash .devcontainer/setup.sh
fi

# Vite dev server uses localhost:5173 — that breaks in Codespaces (blank page).
# Use production assets built into public/build instead.
rm -f public/hot

if [ ! -f public/build/manifest.json ]; then
    echo "==> Building frontend assets..."
    npm run build
fi

echo ""
echo "Starting TrialMatch..."
echo "  Open the forwarded port 8000 URL in your browser"
echo "  Demo: demo@trialmatch.test / password"
echo ""

php artisan serve --host=0.0.0.0 --port=8000
