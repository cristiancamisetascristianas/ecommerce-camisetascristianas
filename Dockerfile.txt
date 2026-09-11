# syntax=docker/dockerfile:1

# [0393] — containerizes the frontend so it runs identically on any
# machine. No native dependencies here (checked package.json), so a single
# builder stage is enough; the runtime stage only needs the standalone
# output next.config.ts now produces (output: "standalone"), not the full
# node_modules tree.
FROM node:24-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# [0393] — NEXT_PUBLIC_* vars are inlined into the browser bundle at build
# time, not read at container start, so this has to be a build arg (see
# docker-compose.yml) rather than a runtime environment variable.
ARG NEXT_PUBLIC_API_URL='https://api.edentenant.com'
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
