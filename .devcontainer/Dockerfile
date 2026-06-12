FROM mcr.microsoft.com/devcontainers/php:1-8.3-bookworm

# Install Node.js 22 system-wide so npm/npx are always on PATH (no nvm required).
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && node --version \
    && npm --version \
    && composer --version
