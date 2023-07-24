FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

COPY package.json ./

RUN npm install 


RUN npm install -g serve

RUN npm run build 

EXPOSE 3000

ENTRYPOINT serve -s dist




