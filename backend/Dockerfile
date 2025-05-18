FROM node:18-alpine

WORKDIR /app

ENV NODE_OPTIONS=--experimental-global-webcrypto


COPY package*.json ./
RUN npm install


EXPOSE 3000

CMD ["npm", "run", "start:dev"]
