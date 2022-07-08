FROM node:16-alpine

LABEL maintainer="dragmove <dragmove@gmail.com>"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]