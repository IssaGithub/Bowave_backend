FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose ports
EXPOSE 3000 3001

# Environment variables
ENV NODE_ENV=production

# Start Vendure server
CMD ["yarn", "start"]
