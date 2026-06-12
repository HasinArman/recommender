#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

echo "==> Installing PHP dependencies..."
composer install --no-interaction --prefer-dist

if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate --force

echo "==> Creating SQLite database..."
mkdir -p database
touch database/database.sqlite

php artisan migrate:fresh --seed --force

echo "==> Installing Node dependencies..."
npm install --no-fund --no-audit

npm run build
rm -f public/hot

echo ""
echo "TrialMatch is ready! Run: bash .devcontainer/start.sh"
