FROM node:12-stretch

USER node

RUN mkdir /home/node/code
WORKDIR /home/node/code

COPY src src
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY bin bin
COPY package-lock.json package-lock.json


RUN npm install
RUN npx tsc

CMD npm start