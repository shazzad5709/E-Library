FROM node:18.17.1
ENV NODE_ENV development


WORKDIR /express-docker

COPY . .
RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 5000