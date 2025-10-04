FROM node:24-alpine AS builder

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
ENV DATABASE_URL postgresql://rays:1234@db/dbrays
ENV NEXT_PUBLIC_SERVER_URL https://raystrading.com
ENV NEXT_PUBLIC_ORG_NAME Raytrading
ENV PAYLOAD_SECRET secret

COPY . .
RUN pnpm build

FROM node:24-alpine AS prod
WORKDIR /app
COPY --from=builder /app/.next/standalone/ .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static .next/static
COPY --from=builder /app/media ./media

EXPOSE 3000
EXPOSE 3333

CMD NODE_ENV=production HOSTNAME="0.0.0.0" node server.js
