FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive
ARG NODE_VERSION=16.20.2

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    build-essential \
    python3 \
    xz-utils \
 && rm -rf /var/lib/apt/lists/*

RUN ARCH="$(dpkg --print-architecture)" \
 && case "$ARCH" in \
      amd64) NODE_ARCH="x64" ;; \
      arm64) NODE_ARCH="arm64" ;; \
      *) echo "Unsupported architecture: $ARCH" >&2; exit 1 ;; \
    esac \
 && curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" \
 && tar -xJf "node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
 && rm "node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" \
 && node --version \
 && npm --version

WORKDIR /workspace
