FROM node:18-alpine AS base

RUN apk update && apk add --no-cache libc6-compat
  

FROM base AS prune

RUN npm i -g turbo@2.3.3

WORKDIR /app
COPY . .

RUN turbo prune @envyper/web --docker


FROM base AS build
RUN \
  corepack enable pnpm && \
  corepack prepare pnpm@9.15.4

WORKDIR /app

COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN pnpm turbo build


FROM nginx:alpine
WORKDIR /app

COPY --from=build /app/apps/web/dist/ /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
