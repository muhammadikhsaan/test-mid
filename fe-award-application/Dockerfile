FROM node:16.17-alpine
EXPOSE 9000

WORKDIR /app

COPY package*.json ./
COPY zeerdas-supports-1.0.0.tgz ./
RUN yarn install

RUN rm -rf ./zeerdas-supports-1.0.0.tgz

COPY . .
CMD ["yarn", "start"]