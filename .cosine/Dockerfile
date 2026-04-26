FROM ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ARG NODE_VERSION=16.20.2

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        g++ \
        git \
        make \
        python3 \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

RUN arch="$(dpkg --print-architecture)" \
    && case "$arch" in \
        amd64) node_arch='x64' ;; \
        arm64) node_arch='arm64' ;; \
        *) echo "Unsupported architecture: $arch" >&2; exit 1 ;; \
    esac \
    && curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${node_arch}.tar.xz" -o /tmp/node.tar.xz \
    && tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 --no-same-owner \
    && rm /tmp/node.tar.xz \
    && node --version \
    && npm --version

WORKDIR /workspace
