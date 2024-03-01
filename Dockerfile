FROM node:20.11.1 AS builder
LABEL authors="Ehsan Saberi"

WORKDIR /build-stage
COPY package*.json ./

RUN npm install

FROM node:20.11.1 AS development


RUN deluser --remove-home node && \
    addgroup -S -g 1000 app && \
    adduser -S -u 1000 app app
WORKDIR home/app


COPY --chown=app:app --from=builder /build-stage/node_modules ./node_modules
COPY --chown=app:app --from=builder /build-stage/package*.json ./



COPY --chown=app:app tsconfig.json ./
COPY --chown=app:app src ./src
COPY --chown=app:app prisma ./prisma
COPY --chown=app:app scripts ./scripts

RUN chown -R app:app ./src && \
    chown -R app:app ./prisma/*

USER app

EXPOSE 3000/tcp
ENV PATH="./scripts:/bin/$PATH"

CMD ["npm","run","dev"]
#CMD ["development.sh"]