# Serve Application using Nginx Server
FROM nginx:latest

COPY ./dist  /usr/share/nginx/html



EXPOSE 80





