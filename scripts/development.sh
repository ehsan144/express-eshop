#!/bin/sh
yarn prisma generate && \
 yarn prisma migrate deploy && \
 yarn run dev

