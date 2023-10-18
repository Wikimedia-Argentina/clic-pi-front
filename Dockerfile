############################################################
# Dockerfile to build NodeJS 18 Installed Containers
# Based on Node:18
############################################################
ARG IMAGE="18-alpine"
ARG PLATFORM="linux/amd64"

FROM --platform=$PLATFORM node:18-alpine as base

# Install dependencies only when needed
FROM base AS deps
ARG NODE_ENV='production'
ENV NODE_ENV=${NODE_ENV}
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git
WORKDIR /usr/local/src/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn install --production

# Rebuild the source code only when needed
FROM base AS builder
ARG NODE_ENV='production'
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/local/src/app
COPY --from=deps /usr/local/src/app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN NODE_ENV=${NODE_ENV} yarn build


# Production image, copy all the files and run next
FROM base AS runner

# Install Global dependencies
RUN set -eux; \
	npm i npm pm2 -g; \
	addgroup --system --gid 1001 nodejs && \
	adduser --system --uid 1001 nextjs;

WORKDIR /app

# GET VARIABLES
ARG NODE_ENV='production'
ARG APP_PORT=3000
ENV PORT=${APP_PORT}
ENV NODE_ENV=${NODE_ENV}
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /usr/local/src/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /usr/local/src/app/ecosystem.config.js ./
COPY --from=builder --chown=nextjs:nodejs /usr/local/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/local/src/app/.next/static ./.next/static

EXPOSE ${PORT}

CMD ["yarn", "docker:start"]
