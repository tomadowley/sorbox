RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  clang \
  libpq-dev \
  python3-dev \
  && rm -rf /var/lib/apt/lists/*
# uv package manager
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
WORKDIR /app
# Shared/workspace deps that scaffolding imports at runtime
# - pips/ shared libs
# - browser client (Python)
# - ccode client (Python stubs)
COPY ./pips ./pips
COPY services/browser /app/services/browser
COPY services/ccode /app/services/ccode
# First resolve/install dependencies without the local project to maximize cache reuse
RUN --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --frozen --no-install-project --no-dev --package=$PACKAGE

# Now copy the scaffolding service source
COPY services/scaffolding /app/services/scaffolding

# Final sync with the project code available
RUN --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --frozen --no-dev --package=$PACKAGE

# Use the venv
ENV PATH="/app/.venv/bin:$PATH"
# Runtime
WORKDIR /app/services/scaffolding
EXPOSE 50071
# Start the gRPC server
CMD ["python", "-u", "-m", "scaffolding_service.server"]