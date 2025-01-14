FROM node:18-slim AS base
RUN npm install -g npm@10.8.2

FROM base AS prune
WORKDIR /app
RUN npm install -g turbo@2.3.3
COPY . .
RUN turbo prune @envyper/api --docker

FROM base AS build
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN npm ci

COPY --from=prune /app/out/full/ .
RUN npx turbo run build

FROM base AS run
WORKDIR /app
COPY --from=build /app/out/full/dist/ .

EXPOSE 3000

CMD ["node", "index.js"]