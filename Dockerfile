FROM nginx:1.23.3-alpine

WORKDIR /app

COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./dist dist