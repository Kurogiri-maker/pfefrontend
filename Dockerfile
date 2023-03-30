# Use a Node.js LTS (Long Term Support) version as the base image
FROM node:lts-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the artifact from the Jenkins build stage to the container's /app directory
COPY dist/pfefrontend /app

# Install http-server for serving the application
RUN npm install -g http-server

# Expose port 4200 for serving the application
EXPOSE 4200

# Start http-server to serve the application
CMD ["http-server", "-p", "4200"]
