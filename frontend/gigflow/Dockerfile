# Use Node 20 base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run Vite with --host to allow external access (inside the container)
CMD ["npm", "run", "dev", "--", "--host"]
