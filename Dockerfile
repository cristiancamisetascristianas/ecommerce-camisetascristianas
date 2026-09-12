# syntax=docker/dockerfile:1

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files (wildcard ensures it works even if package-lock.json is missing in context)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runtime

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure Nginx for React Router (fallback to index.html)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
