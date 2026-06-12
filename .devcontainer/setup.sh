#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

echo "==> Installing PHP dependencies..."
composer install --no-interaction --prefer-dist

echo "==> Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate --force

bash .devcontainer/configure-env.sh

echo "==> Creating SQLite database..."
mkdir -p database
touch database/database.sqlite

echo "==> Running migrations and seeders..."
php artisan migrate:fresh --seed --force

echo "==> Installing Node dependencies..."
npm install --no-fund --no-audit

echo "==> Building frontend assets..."
npm run build
rm -f public/hot

echo ""
echo "TrialMatch is ready!"
echo "  Start app: bash .devcontainer/start.sh"
echo "  (Uses built assets — open port 8000 only; do not use npm run dev in Codespaces)"
echo "  Demo login: demo@trialmatch.test / password"
