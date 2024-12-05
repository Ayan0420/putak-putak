# Use Node.js as the base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js image for runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
