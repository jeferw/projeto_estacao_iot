#FROM node:latest 
FROM arm32v7/node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

EXPOSE 8888

CMD ["npm", "start"]
