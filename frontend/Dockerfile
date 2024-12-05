# Stage 1: Build the application
FROM node:18-alpine AS build

### Set working directory
WORKDIR /app

### Copy package.json and package-lock.json
COPY package*.json ./

### Install dependencies
RUN npm install

### Copy the rest of the application files
COPY . .

### Build the application
RUN npm run build -- --output-path=dist

# Stage 2: Serve with NGINX
FROM nginx:alpine

### Copy build files from the previous stage
COPY --from=build /app/dist/browser /usr/share/nginx/html

### Custom NGINX configuration
# Create a custom NGINX configuration directly in Dockerfile
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose the desired port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]