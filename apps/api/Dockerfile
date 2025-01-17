FROM node:18-alpine AS base

ARGS VITE_CLERK_PUBLISHABLE_KEY=pk_test_dsfd
ARGS VITE_CLERK_SECRET_KEY=sk_test_fdksfjk

FROM base AS prune
WORKDIR /app
RUN apk update && apk add --no-cache libc6-compat
RUN npm install -g turbo@2.3.3

COPY . .
RUN turbo prune @envyper/api --docker


FROM base AS build
WORKDIR /app
RUN corepack enable pnpm && corepack prepare pnpm@9.15.2
COPY --from=prune /app/out/json/ .
RUN pnpm install

COPY --from=prune /app/out/full/ .
RUN pnpx turbo build


FROM oven/bun:1.1.40-alpine AS runner
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist/ .

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY \
    VITE_CLERK_SECRET_KEY=$VITE_CLERK_SECRET_KEY

EXPOSE 3000

CMD [ "bun", "index.js" ]
