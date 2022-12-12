# BUILD
# docker build -t backend:1.0.0 .
# RUN
# docker run -d -p 8001:8001 backend:1.0.0

FROM node:16-alpine

ENV APP_PORT=8001 \
    DB_NAME=testdocker \
    USER_NAME=testdocker \
    DB_PORT=5432 \
    DB_PASSWORD=mysecretpassword \
    HOST=localhost \
    JWT_PRIVATE_KEY=THIS_IS_MY_PRIVATE_KEY_08@D3@5_112328FDDY3J2KFHDH???@$$

COPY . /app

WORKDIR /app

RUN yarn install

RUN npx tsc 

CMD [ "yarn", "start" ]