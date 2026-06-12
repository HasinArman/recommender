#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

if [ ! -f .env ] || [ ! -d vendor ] || [ ! -d node_modules ]; then
    echo "==> First-time setup required..."
    bash .devcontainer/setup.sh
fi

bash .devcontainer/configure-env.sh

# Vite dev server writes public/hot → browser loads localhost:5173 → blank page in Codespaces.
pkill -f "[v]ite" 2>/dev/null || true
rm -f public/hot

echo "==> Building frontend assets for Codespaces..."
npm run build
rm -f public/hot

php artisan optimize:clear --no-interaction 2>/dev/null || php artisan config:clear

# Verify asset URLs will be relative (not localhost).
if [ -f public/hot ]; then
    echo "ERROR: public/hot still exists — delete it: rm -f public/hot"
    exit 1
fi

echo ""
echo "Starting TrialMatch..."
if [ -n "${CODESPACE_NAME:-}" ] && [ -n "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}" ]; then
    echo "  https://${CODESPACE_NAME}-8000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
else
    echo "  http://localhost:8000"
fi
echo "  Demo: demo@trialmatch.test / password"
echo ""

php artisan serve --host=0.0.0.0 --port=8000
