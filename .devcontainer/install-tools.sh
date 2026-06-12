#!/usr/bin/env bash
set -e

MIN_PHP="8.4.1"

php_version_ok() {
    command -v php >/dev/null 2>&1 \
        && php -r "exit(version_compare(PHP_VERSION, '$MIN_PHP', '>=') ? 0 : 1);"
}

has_composer() {
    command -v composer >/dev/null 2>&1
}

has_node_tools() {
    command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1
}

if php_version_ok && has_composer && has_node_tools; then
    exit 0
fi

if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
else
    SUDO=""
fi

fix_apt_sources() {
    # Some PHP devcontainer images ship a broken Yarn apt repo (GPG errors).
    $SUDO rm -f /etc/apt/sources.list.d/yarn.list /etc/apt/sources.list.d/yarn*.list 2>/dev/null || true
}

install_php_84() {
    fix_apt_sources

    echo "==> Installing PHP 8.4..."
    $SUDO apt-get update -qq
    $SUDO apt-get install -y lsb-release ca-certificates curl apt-transport-https unzip git

    if [ ! -f /usr/share/keyrings/deb.sury.org-php.gpg ]; then
        curl -sSLo /tmp/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg
        $SUDO mv /tmp/deb.sury.org-php.gpg /usr/share/keyrings/deb.sury.org-php.gpg
        echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" \
            | $SUDO tee /etc/apt/sources.list.d/php.list >/dev/null
    fi

    $SUDO apt-get update -qq
    $SUDO apt-get install -y \
        php8.4-cli php8.4-sqlite3 php8.4-mbstring php8.4-xml php8.4-curl \
        php8.4-zip php8.4-bcmath php8.4-tokenizer php8.4-dom

    if [ -x /usr/bin/php8.4 ]; then
        $SUDO update-alternatives --install /usr/bin/php php /usr/bin/php8.4 84 2>/dev/null || true
        $SUDO update-alternatives --set php /usr/bin/php8.4 2>/dev/null || true
    fi
}

install_composer() {
    if has_composer; then
        return
    fi

    echo "==> Installing Composer..."
    curl -sS https://getcomposer.org/installer | php
    $SUDO mv composer.phar /usr/local/bin/composer
    $SUDO chmod +x /usr/local/bin/composer
}

install_node() {
    if has_node_tools; then
        return
    fi

    echo "==> Installing Node.js 22..."
    NODE_VERSION=22.16.0
    curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
        | $SUDO tar -xJ -C /usr/local --strip-components=1
}

if command -v php >/dev/null 2>&1 && ! php_version_ok; then
    echo "==> PHP $(php -r 'echo PHP_VERSION;') is too old; need $MIN_PHP+"
fi

if ! php_version_ok; then
    install_php_84
fi

install_composer
install_node

if ! php_version_ok || ! has_composer || ! has_node_tools; then
    echo ""
    echo "ERROR: Could not prepare PHP 8.4, Composer, and Node.js."
    echo "Try: Ctrl+Shift+P -> Codespaces: Rebuild Container"
    exit 1
fi

echo "==> Dev tools ready: PHP $(php -r 'echo PHP_VERSION;'), Node $(node --version)"
