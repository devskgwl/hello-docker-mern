# --- STAGE 1: Compilation Engine ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compile the Vite React application into optimized static assets
RUN npm run build

# --- STAGE 2: Production Hosting Engine ---
FROM nginx:alpine
# Copy the compiled static distribution assets from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Nginx default web hosting port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]