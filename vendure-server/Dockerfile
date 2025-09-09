FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose ports
EXPOSE 3000 3001

# Environment variables
ENV NODE_ENV=production

# Start Vendure server
CMD ["npm", "run", "start"]
