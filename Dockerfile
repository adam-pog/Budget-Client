FROM node:14.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .