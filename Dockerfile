# Serve Application using Nginx Server
FROM nginx:latest

COPY ./dist/pfefrontend  /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80





