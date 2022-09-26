FROM node:16-alpine

WORKDIR /gomoku-server

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN yarn

CMD yarn dev