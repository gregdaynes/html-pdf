# FROM mhart/alpine-node
FROM node:wheezy

# Mount local folder
COPY . /api
WORKDIR /api

RUN npm install phantomjs-bin
RUN npm install

EXPOSE 3000

CMD npm run start
