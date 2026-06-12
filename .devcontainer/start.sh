#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

bash .devcontainer/install-tools.sh

if [ ! -f .env ] || [ ! -d vendor ] || [ ! -d node_modules ]; then
    bash .devcontainer/setup.sh
fi

rm -f public/hot

if [ ! -f public/build/manifest.json ]; then
    npm run build
fi

rm -f public/hot

echo ""
echo "TrialMatch → open port 8000 in the Ports tab"
echo "Demo login: demo@trialmatch.test / password"
echo ""

php artisan serve --host=0.0.0.0 --port=8000
