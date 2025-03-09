# docker-compose up
FROM node:13-slim
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD node app.js