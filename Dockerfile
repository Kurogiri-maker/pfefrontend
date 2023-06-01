# Stage 1: Build the Angular app
FROM node:latest AS ui-build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production

# Serve Application using Nginx Server
FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d

COPY --from=ui-build /app/dist/pfefrontend  /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
