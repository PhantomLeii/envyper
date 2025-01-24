ARG VITE_HANKO_API_URL

FROM node:18-alpine AS base
RUN apk update && apk add --no-cache libc6-compat
  

FROM base AS prune
WORKDIR /app

RUN npm i -g turbo@2.3.3

COPY . .

RUN turbo prune @envyper/web --docker


FROM base AS build
WORKDIR /app

ARG VITE_HANKO_API_URL
ENV VITE_HANKO_API_URL=$VITE_HANKO_API_URL

RUN \
  corepack enable pnpm && \
  corepack prepare pnpm@9.15.4

COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN pnpm turbo build


FROM nginx:alpine
WORKDIR /app

COPY --from=build /app/apps/web/dist/ /usr/share/nginx/html



EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
