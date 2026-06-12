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

echo "==> Creating SQLite database..."
mkdir -p database
touch database/database.sqlite

echo "==> Running migrations and seeders..."
php artisan migrate:fresh --seed --force

echo "==> Installing Node dependencies..."
npm install --no-fund --no-audit

echo "==> Building frontend assets..."
npm run build

echo ""
echo "TrialMatch is ready!"
echo "  Start app (one terminal): bash .devcontainer/start.sh"
echo "  Or after npm install:     npm start"
echo "  Demo login: demo@trialmatch.test / password"
