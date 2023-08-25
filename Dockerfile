FROM node:18-alpine

WORKDIR /usr/app

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=app
ENV DB_USER=admin
ENV DB_PASSWORD=password

COPY package*.json .
RUN npm i

COPY . .

CMD ["npm", "run", "dev"]