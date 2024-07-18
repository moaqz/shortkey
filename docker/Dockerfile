ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-slim AS build

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml /app/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

COPY . ./
RUN pnpm run build

FROM node:${NODE_VERSION}-slim AS prod

WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

ENV HOST=0.0.0.0 NODE_ENV=production
EXPOSE 3000
CMD ["node","/app/server/index.mjs"]
