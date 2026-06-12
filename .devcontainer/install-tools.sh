#!/usr/bin/env bash
set -e

has_php_tools() {
    command -v php >/dev/null 2>&1 && command -v composer >/dev/null 2>&1
}

has_node_tools() {
    command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1
}

if has_php_tools && has_node_tools; then
    exit 0
fi

echo "==> Dev tools missing (PHP/Composer and/or Node.js)."
echo "==> Installing required tools for this Codespace..."

if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
else
    SUDO=""
fi

if ! has_php_tools; then
    echo "==> Installing PHP 8.3 and Composer..."
    $SUDO apt-get update
    $SUDO apt-get install -y lsb-release ca-certificates curl apt-transport-https unzip git

    if [ ! -f /usr/share/keyrings/deb.sury.org-php.gpg ]; then
        curl -sSLo /tmp/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg
        $SUDO mv /tmp/deb.sury.org-php.gpg /usr/share/keyrings/deb.sury.org-php.gpg
        echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" \
            | $SUDO tee /etc/apt/sources.list.d/php.list >/dev/null
    fi

    $SUDO apt-get update
    $SUDO apt-get install -y \
        php8.3-cli php8.3-sqlite3 php8.3-mbstring php8.3-xml php8.3-curl \
        php8.3-zip php8.3-bcmath php8.3-tokenizer php8.3-dom

    if ! command -v composer >/dev/null 2>&1; then
        curl -sS https://getcomposer.org/installer | php
        $SUDO mv composer.phar /usr/local/bin/composer
        $SUDO chmod +x /usr/local/bin/composer
    fi
fi

if ! has_node_tools; then
    echo "==> Installing Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO -E bash -
    $SUDO apt-get install -y nodejs
fi

if ! has_php_tools || ! has_node_tools; then
    echo ""
    echo "ERROR: Could not install PHP, Composer, or Node.js."
    echo "Try: Ctrl+Shift+P -> Codespaces: Rebuild Container"
    exit 1
fi

echo "==> Dev tools ready: PHP $(php -r 'echo PHP_VERSION;'), Node $(node --version)"
