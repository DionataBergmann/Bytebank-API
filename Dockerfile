FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build


FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN yarn install --production && npx prisma generate

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/src/index.js"]
