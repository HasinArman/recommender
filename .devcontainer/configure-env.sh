#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -n "${CODESPACE_NAME:-}" ] && [ -n "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}" ]; then
    APP_URL="https://${CODESPACE_NAME}-8000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    echo "==> Codespaces APP_URL: ${APP_URL}"
    if grep -q '^APP_URL=' .env; then
        sed -i "s|^APP_URL=.*|APP_URL=${APP_URL}|" .env
    else
        echo "APP_URL=${APP_URL}" >> .env
    fi
fi
