#!/usr/bin/env bash
set -e

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
echo "  Run: php artisan serve --host=0.0.0.0 --port=8000"
echo "  Dev: npm run dev  (optional, for hot reload)"
echo "  Demo login: demo@trialmatch.test / password"
