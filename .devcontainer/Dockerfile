FROM mcr.microsoft.com/devcontainers/php:1-8.4-bookworm

# Install Node.js from official binaries (avoids apt/yarn repo GPG conflicts in this image).
ARG NODE_VERSION=22.16.0
RUN curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    | tar -xJ -C /usr/local --strip-components=1 \
    && node --version \
    && npm --version
