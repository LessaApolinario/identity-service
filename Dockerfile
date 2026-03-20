FROM node:24-alpine

ARG PORT=3000
ENV PORT=${PORT:-3000}

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn cache clean --force
RUN yarn install --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start:migrate:prod"]