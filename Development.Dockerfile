FROM node:20.11.1 AS builder
LABEL authors="Ehsan Saberi"

WORKDIR /build-stage
COPY package*.json ./

RUN npm install

FROM node:20.11.1 AS development


RUN deluser --remove-home node

WORKDIR /app

COPY  --from=builder /build-stage/node_modules ./node_modules
COPY  --from=builder /build-stage/package*.json ./


COPY  tsconfig.json ./
COPY  src ./src
COPY  prisma ./prisma
COPY  scripts ./scripts


EXPOSE 3000/tcp
ENV PATH="./scripts:/bin/$PATH"

CMD ["yarn","run","dev"]
#CMD ["development.sh"]